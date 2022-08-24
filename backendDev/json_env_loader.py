from functools import lru_cache
from typing import Tuple, List, Dict, Any, Optional, Union
from pathlib import Path


from pydantic import BaseModel, BaseSettings
from pydantic.env_settings import SettingsSourceCallable

from libs.files.json import JsonSettingSource


class JsonEnvSettings(BaseSettings):
    aws_profile_name: str
    lambda_role_name: str
    lambda_functions: List

    class Config:
        @classmethod
        def customise_sources(
            cls,
            init_settings: SettingsSourceCallable,
            env_settings: SettingsSourceCallable,
            file_secret_settings: SettingsSourceCallable,
        ) -> Tuple[SettingsSourceCallable, ...]:
            main_dir = Path(__file__).resolve().parent
            return (
                init_settings,
                JsonSettingSource(
                    json_file=f"{main_dir}/env.json",
                    file_encoding="utf-8",
                    case_sensitive=False,
                ),
                file_secret_settings,
            )


@lru_cache()
def get_env_json_settings():
    return JsonEnvSettings()
