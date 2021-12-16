from channels.generic.websocket import AsyncWebsocketConsumer
import json

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print('accept')

        self.room_name = "room"
        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name);


    async def message(self, data):
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "group_send_event",
                "event": "message",
                "uuid": data['uuid'],
                "text": data['text'],
            }
        )


    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        if event == "create_player":
            await self.create_player(data)
        elif event == "message":
            await self.message(data)

