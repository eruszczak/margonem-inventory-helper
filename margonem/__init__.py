from decouple import config


if config('DEBUG', default=False, cast=bool):
    from .settings_local import *
else:
    from .settings_production import *
