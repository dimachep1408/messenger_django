from django import forms


class MessageForm(forms.Form):
    message= forms.CharField(max_length=255, label="Ваше повідомлення")