# Generated by Django 5.2 on 2025-06-04 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0006_userprofile_friends_alter_userprofile_requests'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='sign',
            field=models.ImageField(blank=True, null=True, upload_to='profile_signs/'),
        ),
    ]
