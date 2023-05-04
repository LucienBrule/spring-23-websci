{{- define "chart.gitRepositoryUri" -}}
https://{{ .Values.global.gitRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName }}.git
{{- end -}}

{{- define "chart.imageRepository" -}}
{{ .Values.global.imageRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName | lower }}
{{- end -}}

{{- define "chart.imagePrefix" -}}
{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName }}/{{ .Release.Name | lower }}
{{- end -}}

{{- define "chart.web.image.url" -}}
{{ .Values.global.imageRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName | lower }}/{{ .Values.global.alias }}-web:{{ .Values.global.githubSHA }}
{{- end -}}

{{- define "chart.api.image.url" -}}
{{ .Values.global.imageRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName | lower }}/{{ .Values.global.alias }}-web:{{ .Values.global.githubSHA }}
{{- end -}}