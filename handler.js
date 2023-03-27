const triggerConfig = triggerGui.getElementsByClassName("triggerConfig")[0];
const times = triggerGui.getElementsByClassName("timesInput")[0];

getTriggerConfiguration(async () => {
  let config = await triggerConfig.component.getTriggerConfiguration();

  return {
    text: "assure " + config.text + " " + times.component.value + " times.",
    data: {
      config: config,
      times: times.component.value,
    },
  };
});
