from flask import Blueprint, request, jsonify
from app.services.session_service import SessionService
from flask_jwt_extended import jwt_required


session_bp = Blueprint('sessions', __name__, url_prefix=__name__)

@session_bp.route('/', methods=['POST'])
def create_session():
    data = request.json
    required_fields = ['user_id', 'task_list_id']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    session = SessionService.create_session(
        user_id=data['user_id'],
        task_list_id=data['task_list_id'],
        expected_duration_minutes=data.get('expected_duration_minutes')
    )
    return jsonify({
        "id": session.id,
        "user_id": session.user_id,
        "task_list_id": session.task_list_id,
        "initial_time": session.initial_time.isoformat(),
        "end_time": session.end_time.isoformat(),
        "expected_duration_minutes": session.expected_duration_minutes
    }), 201

@session_bp.route('/<int:session_id>', methods=['GET'])
@jwt_required()
def get_session(session_id):
    session = SessionService.get_session(session_id)
    if not session:
        return jsonify({"error": "Session not found"}), 404
    return jsonify({
        "id": session.id,
        "user_id": session.user_id,
        "task_list_id": session.task_list_id,
        "initial_time": session.initial_time.isoformat(),
        "end_time": session.end_time.isoformat(),
        "expected_duration_minutes": session.expected_duration_minutes
    })

@session_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_sessions_by_user(user_id):
    sessions = SessionService.get_sessions_by_user(user_id)
    return jsonify([{
        "id": s.id,
        "user_id": s.user_id,
        "task_list_id": s.task_list_id,
        "initial_time": s.initial_time.isoformat(),
        "end_time": s.end_time.isoformat(),
        "expected_duration_minutes": s.expected_duration_minutes
    } for s in sessions])

@session_bp.route('/<int:session_id>', methods=['PATCH'])
@jwt_required()
def update_session(session_id):
    data = request.json
    session = SessionService.update_session(session_id, **data)
    if not session:
        return jsonify({"error": "Session not found"}), 404
    return jsonify({
        "id": session.id,
        "user_id": session.user_id,
        "task_list_id": session.task_list_id,
        "initial_time": session.initial_time.isoformat(),
        "end_time": session.end_time.isoformat(),
        "expected_duration_minutes": session.expected_duration_minutes
    })

@session_bp.route('/<int:session_id>', methods=['DELETE'])
def delete_session(session_id):
    success = SessionService.delete_session(session_id)
    if not success:
        return jsonify({"error": "Session not found"}), 404
    return jsonify({"message": "Session deleted"})
