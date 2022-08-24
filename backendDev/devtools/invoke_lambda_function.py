import boto3
import os
import sys
import json

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
sys.path.append(base_dir)


def invoke_lambda(function_name):
    from json_env_loader import get_env_json_settings

    env_settings = get_env_json_settings().dict()
    profile_name = env_settings["aws_profile_name"]

    boto3.setup_default_session(profile_name=profile_name)
    lambda_client = boto3.client("lambda")

    test_event = dict()

    response = lambda_client.invoke(
        FunctionName=function_name,
        Payload=json.dumps(test_event),
    )

    print(response["Payload"])
    print(response["Payload"].read().decode("utf-8"))


invoke_lambda("helloWorldLambda")