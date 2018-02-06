from decouple import config


DEBUG = config('DEBUG', default=False, cast=bool)

if DEBUG:
    from .settings_local import *
else:
    from .settings_production import *
