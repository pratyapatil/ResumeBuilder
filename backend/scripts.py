import requests

url = ""

headers = {
    # "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
            "model": "",
            "messages": [{ "role": "user", "content": "Hi" }],
            "temperature": 0.1,
            "max_completion_tokens": 4096,
            "stream": True,
            "format": "json"
}

response = requests.post(url, headers=headers, json=payload)

print("Status Code:", response.status_code)

try:
    print("Response:", response.json())
except:
    print("Raw Response:", response.text)
    
    
    