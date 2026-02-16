def register_blueprints(app):
    # Use RELATIVE imports (IMPORTANT for Render)
    from .auth_routes import auth_bp
    from .job_routes import job_bp
    from .resume_routes import resume_bp
    from .interview_routes import interview_bp
    from .profile_routes import profile_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(job_bp, url_prefix='/api/jobs')
    app.register_blueprint(resume_bp, url_prefix='/api/resumes')
    app.register_blueprint(interview_bp, url_prefix='/api/interviews')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')
