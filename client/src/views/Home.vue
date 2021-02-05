<template>
  <div>
    <button
      type="button"
      class="btn btn-outline-primary btn-lg btn-block mt-4 mb-4"
      @click="toggleForm = !toggleForm">
      {{!toggleForm ? 'Add Your Comment' : 'Hide Comment Box'}}
    </button>
    <div v-if="toggleForm" class="pt-4 pb-4">
      <b-form @submit.prevent="addChat">
        <div v-if="error" class="alert alert-dismissible alert-danger">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Error!</strong> {{error}}
        </div>
        <b-form-group id="input-group-2" label="User Name" label-for="username">
          <b-form-input
            id="username"
            placeholder="John Doe"
            v-model="chat.username"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Subject" label-for="subject">
          <b-form-input
            id="subject"
            placeholder="Felling Happy"
            v-model="chat.subject"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="chat:" label-for="chat">
          <b-form-textarea
            id="chat"
            placeholder="I own the world."
            rows="3"
            max-rows="6"
            v-model="chat.chat"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-2" label="Image Url" label-for="imageUrl">
          <b-form-input
            id="imageUrl"
            placeholder="Image Url"
            v-model="chat.imageUrl"
          ></b-form-input>
        </b-form-group>

        <button  type="submit" variant="primary" class="btn btn-outline-success btn-lg btn-block">
          Submit</button >
      </b-form>
    </div>
    <div class="home">
      <div>
        <ul class="list-unstyled">
          <div v-for="chat in reverseChats" :key="chat._id" class="card mb-2 glass_transpartent">
            <BMedia tag="li" class="p-3">
              <template #aside>
                <BImg  width="64" :alt="chat.subject" :src="chat.imageUrl" class="mr-4"></BImg>
              </template>
              <h6 class="mt-0 mb-1">{{chat.username}}</h6>
              <h5 class="mt-0 mb-1">{{chat.subject}}</h5>
              <p class="mb-0">{{chat.chat}}</p>
              <br />
              <small class="mb-0">{{chat.created}}</small>
            </BMedia>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

const API_URL = 'http://localhost:3333/chats';
export default {
  name: 'Home',

  data() {
    return {
      chats: [],
      chat: {
        username: '',
        subject: '',
        chat: '',
        imageUrl: '',
      },
      toggleForm: false,
      error: '',
    };
  },

  mounted() {
    this.getAllChats();
  },

  computed: {
    reverseChats() {
      return this.chats.slice().reverse();
    },
  },

  methods: {
    getAllChats() {
      fetch(API_URL).then((response) => response.json()).then((result) => {
        this.chats = result;
      });
    },

    addChat() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.chat),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json()).then((result) => {
        if (result.details) {
          const error = result.details[0].message;
          this.error = error;
        } else {
          this.error = '';
          this.toggleForm = false;
          this.chats.push(result);
          this.username = '';
          this.subject = '';
          this.chat = '';
          this.imageUrl = '';
        }
      });
    },
  },

  components: {
  },
};
</script>

<style>
  body{
    background: linear-gradient(to right top, #65dfc9, #6cdbeb);
    color: black;
  }
  .glass_transpartent{
    background: linear-gradient(to right bottom, rgb(255, 255, 255, 0.7),
    rgb(255, 255, 255, 0.3)) !important;
    border-radius: 10px !important;
  }
</style>
