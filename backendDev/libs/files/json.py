from os import PathLike

from pydantic import BaseSettings
from pydantic.env_settings import SettingsSourceCallable, SettingsError

from typing import Dict, Any, Tuple, Union, Optional, Type
from pathlib import Path


def deep_lowercase(
    target: Dict[str, Any], *updating_mappings: Dict[str, Any]
) -> Dict[str, Any]:
    ret = target.copy()
    for updating_mapping in updating_mappings:
        for k, v in updating_mapping.items():
            if k in ret and isinstance(ret[k], dict) and isinstance(v, dict):
                ret[k.lower()] = deep_lowercase(ret[k], v)
            else:
                ret[k.lower()] = v
    return ret


def read_json_file(
    file_path: Union[str, PathLike],
    *,
    encoding: str = None,
    case_sensitive: bool = False,
) -> Dict[str, Optional[Any]]:
    try:
        import json

        with open(file_path, encoding=encoding) as f:
            file_vars: Dict[str, Optional[Any]] = json.load(f)
    except ImportError as e:
        raise ImportError("json lib is not used`") from e

    if not case_sensitive:
        return deep_lowercase(file_vars)
    else:
        return file_vars


class JsonSettingSource:
    __slots__ = ("json_file", "file_encoding", "case_sensitive")

    def __init__(
        self,
        json_file: Optional[Union[str, PathLike]],
        file_encoding: Optional[str],
        case_sensitive: Optional[bool],
    ):
        self.json_file: Optional[Union[str, PathLike]] = json_file
        self.file_encoding: Optional[str] = file_encoding
        self.case_sensitive: Optional[bool] = case_sensitive

    def __call__(self, ignore: BaseSettings) -> Dict[str, Any]:
        try:
            return read_json_file(
                self.json_file,
                encoding=self.file_encoding,
                case_sensitive=self.case_sensitive,
            )
        except Exception as e:
            raise SettingsError(f'wrong Json contents in "{self.json_file}"') from e

    def __repr__(self) -> str:
        return f"JsonSettingsSource(json_file={self.json_file!r}, file_encoding={self.file_encoding!r}, "


class JsonSettings(BaseSettings):
    class Config:
        @classmethod
        def customise_sources(
            cls,
            init_settings: SettingsSourceCallable,
            env_settings: SettingsSourceCallable,
            file_secret_settings: SettingsSourceCallable,
        ) -> Tuple[SettingsSourceCallable, ...]:
            return init_settings, env_settings, file_secret_settings
