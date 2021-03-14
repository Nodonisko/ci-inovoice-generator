interface MailParams {
  to: string;
  cc?: string;
  subject: string;
  body: string;
}

export const generateEmailLink = ({
  to,
  cc = '',
  subject,
  body,
}: MailParams) => {
  const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}&cc=${cc}`;

  return mailtoLink;
};

export const generateSendTimesheetEmail = (timesheetDate: string) => {
  const to = 's.pakandlova@creditinfo.com';
  const cc = 'v.cohen@creditinfo.com';
  const subject = `Timesheet ${timesheetDate}`;
  const body = `Hi, sending ${timesheetDate} timesheet for approval in attachment. Thanks.`;

  return generateEmailLink({ to, cc, subject, body });
};
