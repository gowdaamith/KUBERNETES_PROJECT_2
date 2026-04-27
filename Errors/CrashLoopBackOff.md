CrashLoopBackOff: 
>> YOur container is crashing repeatedly and Kubernetes is backing off before retrying again 

App starts → crashes → Kubernetes restarts → crashes again → waits → retries

![CrashLoopBackoffImage](images/crash.jpeg)

What it looks like in kubernetes: 

STATUS: CrashLoopBackOff
RESTARTS: 5, 10, 20...


* It is NOT Kubernetes bug
* It you application failing inside the container

Why it happends??

1.Application Crash
YOu app exits immediately 

Ex: * missing config
    * runtime error
    * invalid code

2.Missing environment variable
  EX:  APP_NAME is undefined → app crashes → container dies
       Very Common in microservice

3.Wrong startup command:
  node app.js ❌ (file doesn't exist)
  npm start ❌ (missing script)

4.Dependency failure
  DB not reachable
  external API failing
  config service down 

5.Liveness probe killing the container
  if the probe fails repeatedly 
>> Kubernetes kills the pod → restart loop

HOw to Debug CrashLoopBackOff 

1.Check pod status
>> kubectl get pods

2.check logs
>> kubectl logs <pod-name>

3.Check previous crash log
>> kubectl  logs <pod-name> --previous

4.Describe the Pod
>> kubectl describe pod <pod-name>

Look at: 
* Events
* Restart reason
* Probe failure 

| Problem          | Fix                       |
| ---------------- | ------------------------- |
| Missing env vars | Fix ConfigMap/Secret      |
| App crashes      | Fix code                  |
| Probe failure    | Adjust liveness/readiness |
| Wrong image      | Fix Docker image          |
| Port mismatch    | Fix service/deployment    |

