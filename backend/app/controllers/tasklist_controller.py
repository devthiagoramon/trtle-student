# controllers/tasklist_controller.py
from flask import Blueprint, request, jsonify
from app.services.tasklist_service import TaskListService
from flask_jwt_extended import jwt_required,get_jwt_identity


tasklist_bp = Blueprint('tasklists', __name__, url_prefix=__name__)

@tasklist_bp.route('/', methods=['POST'])
@jwt_required()
def create_tasklist():
    data = request.json
    required_fields = ['title', 'description']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    user_id = get_jwt_identity()
    tasklist = TaskListService.create_tasklist(
        title=data['title'],
        user_id=user_id,
        description=data['description']
    )
    return jsonify({
        "id": tasklist.id,
        "title": tasklist.title,
        "description": tasklist.description,
        "user_id": tasklist.user_id
    }), 201

@tasklist_bp.route('/<int:tasklist_id>', methods=['GET'])
@jwt_required()
def get_tasklist(tasklist_id):
    tasklist = TaskListService.get_tasklist(tasklist_id)
    if not tasklist:
        return jsonify({"error": "TaskList not found"}), 404
    return jsonify({
        "id": tasklist.id,
        "title": tasklist.title,
        "description": tasklist.description,
        "user_id": tasklist.user_id
    })

@tasklist_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_tasklists_by_user(user_id):
    tasklists = TaskListService.get_tasklists_by_user(user_id)
    return jsonify([{
        "id": t.id,
        "title": t.title,
        "description": t.description,
        "user_id": t.user_id
    } for t in tasklists])

@tasklist_bp.route('/<int:tasklist_id>', methods=['PATCH'])
@jwt_required()
def update_tasklist(tasklist_id):
    data = request.json
    tasklist = TaskListService.update_tasklist(tasklist_id, **data)
    if not tasklist:
        return jsonify({"error": "TaskList not found"}), 404
    return jsonify({
        "id": tasklist.id,
        "title": tasklist.title,
        "description": tasklist.description,
        "user_id": tasklist.user_id
    })

@tasklist_bp.route('/<int:tasklist_id>', methods=['DELETE'])
@jwt_required()
def delete_tasklist(tasklist_id):
    success = TaskListService.delete_tasklist(tasklist_id)
    if not success:
        return jsonify({"error": "TaskList not found"}), 404
    return jsonify({"message": "TaskList deleted"})
