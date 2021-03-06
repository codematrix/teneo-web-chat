import Vue from 'vue';

export default function registerMessageComponents() {
  const requireComponent = require.context(
    '../components/messages',
    true,
    /Message/
  );

  requireComponent.keys().forEach((fileName) => {
    let messageComponentConfig = requireComponent(fileName);

    messageComponentConfig =
      messageComponentConfig.default || messageComponentConfig;

    const messageComponentName =
      messageComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');

    Vue.component(messageComponentName, messageComponentConfig);
  });
}
