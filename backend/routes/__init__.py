def register_blueprints(app):
    from routes.auth_routes import auth_bp
    from routes.job_routes import job_bp
    from routes.resume_routes import resume_bp
    from routes.interview_routes import interview_bp
    from routes.profile_routes import profile_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(job_bp, url_prefix='/api/jobs')
    app.register_blueprint(resume_bp, url_prefix='/api/resumes')
    app.register_blueprint(interview_bp, url_prefix='/api/interviews')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')