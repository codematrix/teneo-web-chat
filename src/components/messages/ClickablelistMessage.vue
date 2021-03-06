<template>
  <div class="clickablelist" :class="{ expired: replySent || isExpired }">
    <h5 class="clickablelist-title" v-if="clickablelistTitle">{{ clickablelistTitle }}</h5>
    <ul class="clickablelist-message" :class="{ replied: replySent}">
      <li
        v-for="(reply, idx) in clickablelistitems"
        :key="idx"
        class="clickablelist-message__item"
        :class="{ selected: replySent && selected === idx }"
        @click="onSelect(reply, idx)"
      >{{ reply.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ClickablelistMessage',
  props: {
    message: {
      type: Object,
      required: true,
      validator: (message) => {
        return (
          message &&
          message.type === 'clickablelist' &&
          message.data &&
          message.data.list_items &&
          message.data.list_items.length > 0
        );
      },
    },
  },
  computed: {
    clickablelistTitle() {
      if (this.message.data.title) {
        return this.message.data.title;
      }
    },
    clickablelistitems() {
      return this.message.data.list_items;
    },
    replySent() {
      return !!this.message.selected || this.message.selected === 0;
    },
    selected() {
      return this.message.selected;
    },
    isExpired() {
      const { messageList } = this.$teneoApi;
      const latestMessage = messageList[messageList.length - 1];

      return latestMessage && latestMessage !== this.message;
    },
  },
  methods: {
    async onSelect(reply, idx) {
      if (!this.replySent) {
        const numMessages = this.$teneoApi.messageList.length;
        const messages = this.$teneoApi.messageList.slice(0, numMessages - 1);
        const clickablelistMessage = this.$teneoApi.messageList[
          numMessages - 1
        ];

        const selectedItem = { ...clickablelistMessage, selected: idx };

        this.$teneoApi.messageList = [...messages, selectedItem];

        await this.$teneoApi.sendSilentMessage(reply.postback);
      }
    },
  },
};
</script>


<style>
.clickablelist {
  background-color: var(--clickablelist-bg-color);
  border: none;
  width: 100%;
  margin-right: 40px;
}

.clickablelist h5 {
  text-align: center;
  font-family: inherit;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0.6rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--clickablelist-title-color);
}

.clickablelist.expired h5 {
  color: var(--expired-color);
}

.clickablelist-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.clickablelist-message__item {
  border-bottom: 1px solid var(--light-border-color);
  border-right: 1px solid var(--light-border-color);
  border-left: 1px solid var(--light-border-color);
  padding: 8px 14px 8px 14px;
  color: var(--clickablelist-fg-color);
  cursor: pointer;
  font-size: 0.9rem;
}

.clickablelist-message__item:first-child {
  border-top: 1px solid var(--light-border-color);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.clickablelist-message__item:last-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0.25rem;
}

.clickablelist-message__item.selected,
.clickablelist-message:not(.replied) .clickablelist-message__item:hover {
  background-color: var(--clickablelist-selected-bg-color);
  color: var(--clickablelist-selected-fg-color);
}

.clickablelist-message.replied .clickablelist-message__item {
  cursor: default;
  color: var(--expired-color);
}

.clickablelist.expired .clickablelist-message__item,
.clickablelist.expired .clickablelist-message__item:hover {
  cursor: default;
  color: var(--expired-color);
  background-color: var(--clickablelist-bg-color);
}

.clickablelist.expired .clickablelist-message__item.selected,
.clickablelist.expired .clickablelist-message__item.selected:hover {
  cursor: default;
  background-color: var(--clickablelist-selected-bg-color);
  color: var(--expired-color);
}

</style>