from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .forms import MessageForm
from channels.db import database_sync_to_async
from .models import ChatGroup, ChatMessage
from user_app.models import Profile
import base64
from django.core.files.base import ContentFile

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.chat_group_pk = self.scope["url_route"]["kwargs"]["group_pk"]
        self.group_name = str(self.chat_group_pk)
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name 
        )
        await self.accept()
        print("gbmeowigouienw")

    async def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        image = text_data_json["images"]
        
        # Получаем данные пользователя асинхронно
        first_name = self.scope["user"].first_name
        last_name = self.scope["user"].last_name
        user_image = await self.get_user_profile(self.scope["user"])
        
        saved_message = await self.save_message(message=message, image = image)
        
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "send_message_to_chat",
                "text_data": text_data,
                "first_name": first_name,
                "last_name": last_name,
                "user_avatar": user_image,
                "date_time": saved_message.sent_at,
                "atteched_image": image
            }
        )

    async def send_message_to_chat(self, event):    
        text_data_dict = json.loads(event["text_data"])
        first_name = event["first_name"]
        last_name = event["last_name"]
        user_avatar = event["user_avatar"]
        text_data_dict['first_name'] = first_name
        text_data_dict['last_name'] = last_name
        text_data_dict['user_avatar'] = user_avatar  
        text_data_dict["date_time"] = event["date_time"].isoformat()
        print(event["atteched_image"])
        text_data_dict["atteched_image"] = event["atteched_image"]
        

        form = MessageForm(text_data_dict)
        if form.is_valid():
            await self.send(json.dumps(text_data_dict))
        else:
            print('error')

    @database_sync_to_async
    def get_user_profile(self, user):
        if Profile.objects.get(user = user).avatar_set.last():
            return Profile.objects.get(user = user).avatar_set.last().image.url
        else:
            return None


    @database_sync_to_async
    def save_message(self, message, image):
        author = Profile.objects.get(user=self.scope['user'])
        group = ChatGroup.objects.get(pk=self.group_name)
        if not image or not isinstance(image, str):
            return ChatMessage.objects.create(
                author=author,
                content=message,
                chat_group=group
            )

        try:

            header, data = image.split(';base64,')

            file_extension = header.split('/')[-1]  
            
            decoded_data = base64.b64decode(data)
            
            file_name = f"msg_{group.pk}_{author.user.username}.{file_extension}"
            file = ContentFile(decoded_data, name=file_name)
            
            return ChatMessage.objects.create(
                author=author,
                content=message,
                chat_group=group,
                attached_image=file
            )
        except:
            return ChatMessage.objects.create(
                author=author,
                content=message,
                chat_group=group
            )