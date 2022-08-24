import boto3
import json
import os
import sys

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
sys.path.append(base_dir)


def create_iam_role():
    from json_env_loader import get_env_json_settings

    env_settings = get_env_json_settings().dict()
    profile_name = env_settings["aws_profile_name"]
    lambda_role_name = env_settings["lambda_role_name"]
    boto3.setup_default_session(profile_name=profile_name)
    iam = boto3.client("iam")

    role_policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {"Service": "lambda.amazonaws.com"},
                "Action": "sts:AssumeRole",
            }
        ],
    }

    response = iam.create_role(
        RoleName=lambda_role_name,
        AssumeRolePolicyDocument=json.dumps(role_policy),
    )

    print(response)


create_iam_role()
