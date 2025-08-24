# controllers/user_controller.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.user_service import UserService

user_bp = Blueprint('users', __name__, url_prefix='/users')

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.json
    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing fields"}), 400
    
    user = UserService.create_user(data['username'], data['email'], data['password'])
    return jsonify({"id": user.id, "username": user.username, "email": user.email}), 201

@user_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = UserService.get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"id": user.id, "username": user.username, "email": user.email})

@user_bp.route('/<int:user_id>', methods=['PATCH'])
@jwt_required()
def update_user(user_id):
    data = request.json
    user = UserService.update_user(user_id, **data)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"id": user.id, "username": user.username, "email": user.email})

@user_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    success = UserService.delete_user(user_id)
    if not success:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted"})
