# Generated by Django 5.2 on 2025-06-03 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0003_alter_userprofile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='photo',
            field=models.ImageField(blank=True, default='images/standart_user_image.png', null=True, upload_to='profile_photos/'),
        ),
    ]
