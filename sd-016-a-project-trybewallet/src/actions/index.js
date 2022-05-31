export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const SUBMIT_VALUE = 'SUBMIT_VALUE';

export const submitEmail = (payloadEmail) => ({
  type: SUBMIT_EMAIL,
  payloadEmail,
});

export const submitValue = (payloadValue) => ({
  type: SUBMIT_VALUE,
  payloadValue,
});
