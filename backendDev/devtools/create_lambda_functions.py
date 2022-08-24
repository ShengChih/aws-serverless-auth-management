import boto3
import os
import sys

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
sys.path.append(base_dir)


def create_lambda_functions(base_dir):
    from json_env_loader import get_env_json_settings

    env_settings = get_env_json_settings().dict()
    profile_name = env_settings["aws_profile_name"]
    lambda_role_name = env_settings["lambda_role_name"]
    lambda_functions = env_settings["lambda_functions"]
    boto3.setup_default_session(profile_name=profile_name)

    iam_client = boto3.client("iam")
    lambda_client = boto3.client("lambda")

    for lambda_func in lambda_functions:
        filepath = os.path.join(base_dir, lambda_func["RelativeFilePath"])

        if not os.path.exists(filepath):
            raise Exception(f"Not found zip lambda code: {filepath}\n")

        with open(filepath, "rb") as f:
            zipped_code = f.read()

        role = iam_client.get_role(RoleName=lambda_role_name)

        response = lambda_client.create_function(
            FunctionName=lambda_func["FunctionName"],
            Runtime=lambda_func["Runtime"],
            Role=role["Role"]["Arn"],
            Handler=lambda_func["Handler"],
            Code=dict(ZipFile=zipped_code),
            Timeout=lambda_func["Timeout"],  # Maximum allowable timeout
            Environment=lambda_func[
                "Environment"
            ],  # Set up Lambda function environment variables
        )

        print(response)


create_lambda_functions(base_dir)
