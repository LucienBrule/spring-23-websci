{{- define "chart.gitRepositoryUri" -}}
https://{{ .Values.global.gitRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName }}.git
{{- end -}}

{{- define "chart.imageRepository" -}}
{{ .Values.global.imageRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName | lower }}
{{- end -}}

{{- define "chart.imagePrefix" -}}
{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName }}/{{ .Release.Name | lower }}
{{- end -}}

{{- define "chart.api.imageStreamTag" -}}
{{ (include "chart.imagePrefix" .) }}-api:latest
{{- end -}}

{{- define "chart.web.imageStreamTag" -}}
{{ (include "chart.imagePrefix" .) }}-client:latest
{{- end -}}


{{- define "chart.web.image.repository" -}}
{{ .Values.global.imageRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName | lower }}/{{ include "chart.imagePrefix" . }}-web
{{- end -}}

{{- define "chart.api.image.repository" -}}
{{ .Values.global.imageRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName | lower }}/{{ include "chart.imagePrefix" . }}-api
{{- end -}}
