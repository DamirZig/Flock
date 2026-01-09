import urllib.request
import urllib.error
import json
import time

BASE_URL = "http://localhost:8000"

def make_request(endpoint, data):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, method="POST")
    req.add_header('Content-Type', 'application/json')
    json_data = json.dumps(data).encode('utf-8')
    try:
        with urllib.request.urlopen(req, data=json_data) as response:
            return response.status, response.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')
    except Exception as e:
        return 0, str(e)

def test_weak_password():
    print("Test 1: Weak Password Registration")
    payload = {
        "email": "weak@example.com",
        "password": "123", # Too short, no letters
        "full_name": "Weak Pass"
    }
    status_code, body = make_request("/register", payload)
    if status_code == 422:
        print("PASS: Weak password rejected (422)")
    else:
        print(f"FAIL: Expected 422, got {status_code}")
        print(body)

def test_strong_password():
    print("\nTest 2: Strong Password Registration")
    email = f"strong{int(time.time())}@example.com"
    payload = {
        "email": email,
        "password": "StrongPass1", # 8+ chars, upper, lower, digit
        "full_name": "Strong Pass"
    }
    status_code, body = make_request("/register", payload)
    if status_code == 200:
        print("PASS: Strong password accepted (200)")
        return email, "StrongPass1"
    else:
        print(f"FAIL: Expected 200, got {status_code}")
        print(body)
        return None, None

def test_rate_limit(email, password):
    if not email:
        print("\nSkipping Rate Limit test due to registration failure")
        return

    print("\nTest 3: Rate Limiting (Login)")
    payload = {"email": email, "password": password}
    
    for i in range(1, 8):
        status_code, _ = make_request("/login", payload)
        print(f"Attempt {i}: Status {status_code}")
        if status_code == 429:
            print(f"PASS: Rate limit hit on attempt {i}")
            return
        time.sleep(0.1)
    
    print("FAIL: Rate limit not hit after 7 attempts")

if __name__ == "__main__":
    test_weak_password()
    email, password = test_strong_password()
    test_rate_limit(email, password)
