import argparse

from models import AuthTokens
from psiturk.db import db_session, init_db


def create_user(user_name, auth_token):
    try:
        user_record = AuthTokens(
            user_name=user_name,
            authtoken=auth_token
        )
        print(user_record)
        db_session.add(user_record)
        db_session.commit()
    except:
        print("Error occured while creating user!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate new episodes."
    )
    parser.add_argument(
        "--user-name",
        type=str,
        default="dummy",
        help="AuthTokens username",
    )
    parser.add_argument(
        "--auth-token",
        type=str,
        default="dummy",
        help="User auth token"
    )
    args = parser.parse_args()
    create_user(args.user_name, args.auth_token)
