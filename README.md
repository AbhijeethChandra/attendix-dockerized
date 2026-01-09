🛠️ Pre-Docker Setup & Validation
Before containerizing Attendix, the application was installed, configured, and verified directly on an Ubuntu EC2 instance.
This ensured the system worked correctly end-to-end before introducing Docker.
The process followed a step-by-step, verifiable deployment flow, avoiding assumptions and validating each layer independently.
________________________________________
1️⃣ Database Initialization (PostgreSQL)
The database was prepared first to ensure application stability.
Steps performed:
•	Installed PostgreSQL on Ubuntu
•	Created a dedicated database:
o	attendix_db
•	Created a dedicated database user:
o	attendix
•	Assigned ownership and privileges of the database to the user
•	Imported the provided SQL dump into the database
•	Verified database access manually using psql
Automatic migration tools were intentionally avoided until manual verification was complete.
________________________________________
2️⃣ Clean Application State
Before deployment, the EC2 instance was inspected and cleaned:
•	Removed existing Attendix systemd services
•	Stopped and removed old nohup Java processes
•	Cleared previous Attendix logs
•	Removed old Jenkins jobs related to Attendix
•	Verified no ports were already in use
This ensured a predictable and conflict-free environment.
________________________________________
3️⃣ Jenkins-Based Build & Deployment
A Jenkins workflow was used to build and deploy the application artifacts.
Steps:
•	Jenkins pulled the source repository
•	Jenkins built the Spring Boot JAR files
•	Jenkins copied the JARs to deployment directories:
o	Backend
o	Auth service
•	Build artifacts were validated before execution
________________________________________
4️⃣ Script-Based Application Startup
Each service was started using explicit shell scripts instead of inline commands.
Example flow:
•	Created executable startup scripts (.sh)
•	Used nohup to run services in the background
•	Redirected logs to /var/log/
This allowed:
•	Manual execution
•	Log inspection
•	Easy restart without rebuilding
________________________________________
5️⃣ systemd Service Integration
System services were created to manage application lifecycle.
Each systemd service:
•	Executed the corresponding startup script
•	Used a fixed working directory
•	Restarted automatically on failure
•	Survived EC2 reboots
Verification steps included:
•	Manual service start
•	systemd start/stop
•	Reboot persistence testing
________________________________________
6️⃣ Nginx Reverse Proxy Configuration
Nginx was configured after all services were confirmed running.
Configured routes:
•	/ → Frontend
•	/attendix → Backend service
•	/attendix-oauth → Auth service
Validation was done using:
•	Browser testing
•	curl requests
•	HTTP status verification
At this stage, the entire application was fully functional without Docker.
________________________________________
7️⃣ Transition to Dockerization
Only after confirming:
•	Database connectivity
•	Backend APIs
•	Auth flows
•	Frontend routing
…the system was containerized service-by-service:
•	Backend Docker image
•	Auth Docker image
•	Frontend Docker image
•	PostgreSQL container
•	Nginx reverse proxy integration
•	Docker Compose orchestration
•	Offline .tar image exports
This ensured Docker was used as a deployment improvement, not a troubleshooting layer.
________________________________________
✅ Why This Matters
This approach demonstrates:
•	Real deployment discipline
•	Debug-first mindset
•	Infrastructure awareness beyond containers
•	Docker used correctly — after validation
________________________________________
🎯 Result
Attendix now runs as:
•	A fully dockerized microservices stack
•	With verified behavior matching the original EC2 deployment
•	Ready for portability, reuse, and offline installation

