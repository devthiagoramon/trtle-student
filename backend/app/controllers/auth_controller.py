from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        result = AuthService.register(
            username=data["username"],
            email=data["email"],
            password=data["password"]
        )
        return jsonify({
            "message": "Usuário criado com sucesso",
            **result
        }), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()   
        result = AuthService.login(data["email"], data["password"])
        if not result:
            return jsonify({"error": "Credenciais inválidas"}), 401
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    try:
        user_id = get_jwt_identity()
        result = AuthService.get_profile(user_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
