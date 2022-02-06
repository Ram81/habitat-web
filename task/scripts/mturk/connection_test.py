import os
import boto3

MTURK_SANDBOX = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'

mturk = boto3.client('mturk',
   aws_access_key_id = os.environ.get("AWS_ACCESS_KEY"),
   aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY"),
   region_name='us-east-1',
   endpoint_url = MTURK_SANDBOX
)

print("I have $" + mturk.get_account_balance()['AvailableBalance'] + " in my Sandbox account")
