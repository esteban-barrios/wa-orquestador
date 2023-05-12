const serviceStateEl = document.querySelector('#service-state');
const runningInstancesEl = document.querySelector('#running-instances');
const cpuUsageEl = document.querySelector('#cpu-usage');
const memoryUsageEl = document.querySelector('#memory-usage');
const storageUsageEl = document.querySelector('#storage-usage');
const averageResponseTimeEl = document.querySelector('#average-response-time');
const requestsProcessedEl = document.querySelector('#requests-processed');
const errorsEl = document.querySelector('#errors');

fetch('/api/service-status')
  .then(response => response.json())
  .then(data => {
    // serviceState, runningInstances, cpuUsage, memoryUsage, storageUsage, averageResponseTime, requestsProcessed, errorsnt = data.serviceState;
    
    serviceStateEl.textContent = data.serviceState;
    runningInstancesEl.textContent = data.runningInstances;
    cpuUsageEl.textContent = `CPU: ${data.cpuUsage}%`;
    memoryUsageEl.textContent = `Memoria: ${data.memoryUsage}%`;
    storageUsageEl.textContent = `Almacenamiento: ${data.storageUsage}%`;
    averageResponseTimeEl.textContent = `Tiempo de respuesta promedio: ${data.averageResponseTime}`;
    requestsProcessedEl.textContent = `Solicitudes procesadas: ${data.requestsProcessed}`;
    errorsEl.textContent = `Errores: ${data.errors}`;
  })
  .catch(error => console.error(error));
