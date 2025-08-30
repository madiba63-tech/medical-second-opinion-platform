{{/*
Expand the name of the chart.
*/}}
{{- define "second-opinion.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "second-opinion.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "second-opinion.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "second-opinion.labels" -}}
helm.sh/chart: {{ include "second-opinion.chart" . }}
{{ include "second-opinion.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: second-opinion-platform
{{- end }}

{{/*
Selector labels
*/}}
{{- define "second-opinion.selectorLabels" -}}
app.kubernetes.io/name: {{ include "second-opinion.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "second-opinion.serviceAccountName" -}}
{{- if .Values.security.serviceAccount.create }}
{{- default (include "second-opinion.fullname" .) .Values.security.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.security.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Generate certificates for TLS
*/}}
{{- define "second-opinion.gen-certs" -}}
{{- $altNames := list ( printf "%s.%s" (include "second-opinion.fullname" .) .Release.Namespace ) ( printf "%s.%s.svc" (include "second-opinion.fullname" .) .Release.Namespace ) -}}
{{- $ca := genCA "second-opinion-ca" 365 -}}
{{- $cert := genSignedCert ( include "second-opinion.fullname" . ) nil $altNames 365 $ca -}}
tls.crt: {{ $cert.Cert | b64enc }}
tls.key: {{ $cert.Key | b64enc }}
{{- end }}

{{/*
Create image pull secret for private registry
*/}}
{{- define "imagePullSecret" }}
{{- printf "{\"auths\":{\"%s\":{\"username\":\"%s\",\"password\":\"%s\",\"auth\":\"%s\"}}}" .Values.app.image.registry .Values.global.registryCredentials.username .Values.global.registryCredentials.password (printf "%s:%s" .Values.global.registryCredentials.username .Values.global.registryCredentials.password | b64enc) | b64enc }}
{{- end }}

{{/*
PostgreSQL primary fullname
*/}}
{{- define "postgresql.primary.fullname" -}}
{{- if .Values.postgresql.fullnameOverride -}}
{{- .Values.postgresql.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default "postgresql" .Values.postgresql.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Redis fullname
*/}}
{{- define "redis.fullname" -}}
{{- if .Values.redis.fullnameOverride -}}
{{- .Values.redis.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default "redis" .Values.redis.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Kafka fullname
*/}}
{{- define "kafka.fullname" -}}
{{- if .Values.kafka.fullnameOverride -}}
{{- .Values.kafka.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default "kafka" .Values.kafka.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Cloud-specific storage class
*/}}
{{- define "second-opinion.storageClass" -}}
{{- if .Values.global.storageClass -}}
{{- .Values.global.storageClass -}}
{{- else if eq .Values.global.cloudProvider "aws" -}}
{{- .Values.cloudProvider.aws.storageClass -}}
{{- else if eq .Values.global.cloudProvider "azure" -}}
{{- .Values.cloudProvider.azure.storageClass -}}
{{- else if eq .Values.global.cloudProvider "gcp" -}}
{{- .Values.cloudProvider.gcp.storageClass -}}
{{- else -}}
{{- "standard" -}}
{{- end -}}
{{- end -}}

{{/*
Cloud-specific load balancer annotations
*/}}
{{- define "second-opinion.loadBalancerAnnotations" -}}
{{- if eq .Values.global.cloudProvider "aws" }}
service.beta.kubernetes.io/aws-load-balancer-type: {{ .Values.cloudProvider.aws.loadBalancerType | quote }}
service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
{{- else if eq .Values.global.cloudProvider "azure" }}
service.beta.kubernetes.io/azure-load-balancer-internal: "false"
{{- else if eq .Values.global.cloudProvider "gcp" }}
cloud.google.com/load-balancer-type: {{ .Values.cloudProvider.gcp.loadBalancerType | quote }}
cloud.google.com/neg: '{"ingress": true}'
{{- end }}
{{- end }}

{{/*
Monitoring configuration
*/}}
{{- define "second-opinion.monitoringEnabled" -}}
{{- or .Values.monitoring.prometheus.enabled .Values.monitoring.grafana.enabled .Values.monitoring.jaeger.enabled -}}
{{- end }}

{{/*
Security context for containers
*/}}
{{- define "second-opinion.securityContext" -}}
{{- if .Values.global.securityContext.enabled }}
securityContext:
  runAsNonRoot: {{ .Values.global.securityContext.runAsNonRoot }}
  runAsUser: {{ .Values.global.securityContext.runAsUser }}
  runAsGroup: {{ .Values.global.securityContext.runAsGroup }}
  fsGroup: {{ .Values.global.securityContext.fsGroup }}
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: false
  capabilities:
    drop:
      - ALL
{{- end }}
{{- end }}

{{/*
Pod security standards
*/}}
{{- define "second-opinion.podSecurityStandards" -}}
{{- if .Values.security.podSecurityStandards.enforced }}
pod-security.kubernetes.io/enforce: {{ .Values.security.podSecurityStandards.level | quote }}
pod-security.kubernetes.io/audit: {{ .Values.security.podSecurityStandards.level | quote }}
pod-security.kubernetes.io/warn: {{ .Values.security.podSecurityStandards.level | quote }}
{{- end }}
{{- end }}