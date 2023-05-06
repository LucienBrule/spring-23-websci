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
{{ .Values.global.imageRepositoryHost }}/{{ .Values.global.githubUsername }}/{{ .Values.global.gitRepositoryName | lower }}/{{ .Values.global.alias }}-api:{{ .Values.global.githubSHA }}
{{- end -}}


{{/*
Check if a value exists in the YAML.
Usage: `{{- if has "key1.key2.key3" .Values }}`
*/}}
{{- define "has" -}}
{{- $keys := splitList "." . -}}
{{- $val := .Values -}}
{{- $exists := true -}}
{{- range $keys -}}
    {{- if not (hasKey $val .) -}}
        {{- required printf "unable to find key %q in %v" . $val -}}
        {{- $exists = false -}}
        {{- break -}}
    {{- end -}}
    {{- $val = index $val $ -}}
{{- end -}}
{{- if $exists -}}
  {{- true -}}
{{- end -}}
{{- end -}}
