/* ============================================================
   Cyber Sentinels — content bank
   Every item is a real-world attack pattern, written for students.
   ============================================================ */

(() => {
const PHISH = [
  {
    id: 'paypal',
    type: 'phish', channel: 'email', time: 30,
    from: 'PayPal Service',
    fromAddr: 'service@paypa1-secure.com',
    subject: '⚠️ Action required: your account will be limited in 24 hours',
    at: 'Today, 04:12',
    body: `Dear Customer,

We detected unusual sign-in activity on your account. To keep your account secure, you must confirm your identity within 24 hours or your balance will be permanently limited.

Confirm your information now to avoid permanent limitation.`,
    link: 'http://paypa1-secure.com/verify-account',
    verdict: 'scam',
    flags: [
      'The domain uses "paypa1" with the number 1 — a classic look-alike.',
      '"Dear Customer" instead of your name: real PayPal greets you by name.',
      'A 24-hour deadline is there to make you panic, not think.',
      'The link goes to a look-alike site, not paypal.com.'
    ],
    lesson: 'Read the domain immediately before the first slash. "paypa1-secure.com" is not paypal.com, no matter what the logo says.'
  },
  {
    id: 'fieldtrip',
    type: 'phish', channel: 'email', time: 30,
    from: 'Ms. Rivera (Science)',
    fromAddr: 'rivera@lincolnhs.edu',
    subject: 'Field trip permission slip — due Friday',
    at: 'Yesterday, 15:40',
    body: `Hi team,

Quick reminder that the aquarium permission slip is due Friday. Bring the signed paper to class — please don't email it.

See you in period 3,
Ms. Rivera`,
    verdict: 'safe',
    flags: [
      'The address is on the real school domain, lincolnhs.edu.',
      'No links, no attachments, no login request.',
      'Asks for an in-person action — exactly how a teacher works.'
    ],
    lesson: 'Not every email is an attack. The check is always the same: real domain, expected context, no credentials requested.'
  },
  {
    id: 'giftcard',
    type: 'phish', channel: 'sms', time: 25,
    from: '+1 (804) 555-0147',
    subject: 'Amazon Reward',
    at: 'Today, 08:07',
    body: `🎉 CONGRATS! You've been selected to receive a $1,000 Amazon gift card.

Claim within 2 HOURS or your reward expires:

bit.ly/x9kQ2`,
    link: 'bit.ly/x9kQ2',
    verdict: 'scam',
    flags: [
      'You never entered a competition — you cannot win one.',
      'A shortened link hides where it really goes.',
      'A two-hour deadline is pure pressure tactics.',
      'Unknown number, mass-blast wording ("CONGRATS!").'
    ],
    lesson: 'Nobody gives away $1,000 by text. Shortened links hide the destination — treat them as guilty until proven innocent.'
  },
  {
    id: 'itdesk',
    type: 'phish', channel: 'email', time: 30,
    from: 'IT Helpdesk',
    fromAddr: 'it-helpdesk@lincoln-school-support.com',
    subject: 'Mailbox full — reply with your password to keep your account',
    at: 'Today, 06:55',
    body: `Your mailbox has exceeded its storage limit.

Reply to this email with your username and password so we can upgrade your storage. Do not change your password during this migration.`,
    verdict: 'scam',
    flags: [
      'The domain is lincoln-school-support.com — not your school domain.',
      'IT never needs your password. Ever.',
      '"Do not change your password" is a control tactic to keep access.',
      'Real storage problems are fixed in a portal, not by email reply.'
    ],
    lesson: 'No legitimate helpdesk asks for your password. If the message says "don\'t change your password", that is the attacker protecting their access.'
  },
  {
    id: 'gdocs',
    type: 'phish', channel: 'email', time: 30,
    from: 'Google Docs',
    fromAddr: 'no-reply@docs-google.com',
    subject: 'A document has been shared with you',
    at: 'Today, 09:21',
    body: `Your teacher shared "Unit 6 Study Guide" with you.

Open the document to view it before tomorrow's test.`,
    link: 'https://docs.google.com.secure-share.co/view/9f2a',
    verdict: 'scam',
    flags: [
      'The sender is docs-google.com, not google.com.',
      'In the link, the real domain is secure-share.co — "docs.google.com" is just a decoy prefix.',
      'The shared-document lure is one of the most-clicked phishing themes.',
      '"Before tomorrow\'s test" adds time pressure.'
    ],
    lesson: 'Domains are read right-to-left from the first single slash. In docs.google.com.secure-share.co the real owner is secure-share.co.'
  },
  {
    id: 'bankalerts',
    type: 'phish', channel: 'email', time: 30,
    from: 'Valley National Bank',
    fromAddr: 'alerts@valleynational.bank',
    subject: 'Card purchase alert — $48.20 at Riverside Grocery',
    at: 'Today, 11:02',
    body: `We noticed a $48.20 purchase at Riverside Grocery on your debit card ending 4417.

If this was you, no action is needed. If it wasn't, call the number on the back of your debit card or open the bank app.

We will never ask for your PIN or a one-time code.`,
    verdict: 'safe',
    flags: [
      'Sender domain matches the bank\'s real domain.',
      'No link at all — it points you to the official app or the number on your card.',
      'It explicitly says it will never ask for a PIN or code.',
      'A purchase you actually made matches the alert.'
    ],
    lesson: 'Real banks do send alerts — the test is that they send you to a channel you already trust instead of a link in the message.'
  },
  {
    id: 'internship',
    type: 'phish', channel: 'email', time: 30,
    from: 'Talent Team — BrightWave Media',
    fromAddr: 'careers.brightwave@gmail.com',
    subject: 'Selected: Remote Data Assistant — $500/week, start Monday',
    at: 'Yesterday, 22:14',
    body: `Congratulations! You were selected from 300 applicants for a remote role at $500/week.

To activate your position, purchase two $50 Steam gift cards for the equipment kit and send the codes to your onboarding manager.

Also reply with your home address and a photo of your student ID.`,
    verdict: 'scam',
    flags: [
      'A real company recruits from its own domain, not a free Gmail account.',
      'No interview happened — you cannot be "selected".',
      'Gift cards are untraceable cash: no real employer ever asks for them.',
      'It harvests your address and student ID for identity theft.'
    ],
    lesson: 'Any job that asks you to pay first — especially in gift cards — is a scam. Real employers never ask you to buy anything to start.'
  },
  {
    id: 'usps',
    type: 'phish', channel: 'sms', time: 25,
    from: '+1 (206) 555-0193',
    subject: 'USPS',
    at: 'Today, 07:44',
    body: `USPS: Your parcel is on hold due to an incomplete address.

Pay the $1.99 redelivery fee within 12 hours:

usps-redelivery.top/pay`,
    link: 'usps-redelivery.top/pay',
    verdict: 'scam',
    flags: [
      'A .top domain has nothing to do with the postal service.',
      'A tiny fee is bait — the form harvests your full card details.',
      'You are not expecting a parcel that needs a fee.',
      'USPS does not text payment links for redelivery.'
    ],
    lesson: 'Small fees are big business for phishers: they get a full card number for "only $1.99". Track parcels in the official app instead.'
  },
  {
    id: 'steam',
    type: 'phish', channel: 'dm', time: 25,
    from: 'steamcommuntiy-noreply',
    subject: 'Steam Support',
    at: 'Today, 16:31',
    body: `Your account has been flagged for cheating and will be permanently banned.

To appeal, reply with the Steam Guard code sent to your phone so we can verify ownership.

Failure to respond in 30 minutes = permanent ban.`,
    verdict: 'scam',
    flags: [
      'The sender name is misspelled: "steamcommuntiy".',
      'No real support team asks for your 2FA / Steam Guard code.',
      'Threats of a permanent ban are designed to stop you thinking.',
      'You were contacted first, out of nowhere, in a chat.'
    ],
    lesson: 'A one-time code is a key. Anyone who asks you to read it out is trying to walk through your front door — even if they say they are support.'
  },
  {
    id: 'frienddm',
    type: 'phish', channel: 'dm', time: 25,
    from: '@jayden_hoops',
    subject: 'Jayden',
    at: 'Today, 20:12',
    body: `yo my account got locked and I need to get back in 😩

steam just sent a code to your phone right? send it here real quick i'll pay you back`,
    verdict: 'scam',
    flags: [
      'A friend\'s account was likely hijacked — the "friend" is now the attacker.',
      'It asks for a code sent to YOUR phone.',
      '"real quick" is pressure to skip the obvious question.',
      'You can verify by calling or seeing them in person.'
    ],
    lesson: 'Account-takeover scams often come from a real friend\'s hacked account. Verify out loud, on a different channel, before you send anything.'
  },
  {
    id: 'zoom',
    type: 'phish', channel: 'email', time: 30,
    from: 'Mr. Okafor (History)',
    fromAddr: 'okafor@lincolnhs.edu',
    subject: 'Zoom link for Thursday review session',
    at: 'Yesterday, 18:05',
    body: `Hi all,

Here is the link for the exam review on Thursday at 6pm. It's open to the whole class — join from the waiting room, no password needed.

https://lincolnhs.zoom.us/j/8823190475`,
    link: 'https://lincolnhs.zoom.us/j/8823190475',
    verdict: 'safe',
    flags: [
      'The link is on the school\'s own zoom.us subdomain.',
      'It matches a meeting you already expect from a known teacher.',
      'No login, password or personal details are requested.'
    ],
    lesson: 'Context matters: a link that matches an expected event, from a real school address, on the real service, is normal. Just never enter your school password to "join".'
  },
  {
    id: 'library',
    type: 'phish', channel: 'email', time: 30,
    from: 'Lincoln High Library',
    fromAddr: 'library@lincolnhs.edu',
    subject: 'Overdue: "The Martian" — $2 fine',
    at: 'Yesterday, 09:12',
    body: `Hi Sam,

Our records show "The Martian" was due Oct 18. Please return it to the front desk or renew it through the student portal you already use.

No payment link is included — fines are paid at the desk.

— Ms. Chen, Library`,
    verdict: 'safe',
    flags: [
      'Real school domain, personal greeting, specific detail you recognise.',
      'Explicitly refuses to send a payment link.',
      'Points to a portal you already use, not a new site.'
    ],
    lesson: 'A legitimate message reduces risk: it names you, matches reality, and never rushes you to a payment page.'
  },
  {
    id: 'lunch',
    type: 'phish', channel: 'email', time: 30,
    from: 'Student Accounts',
    fromAddr: 'billing@lincolnhs-billing.net',
    subject: 'Unpaid lunch balance — invoice attached',
    at: 'Today, 10:48',
    body: `Your lunch account is past due $18.50.

Open the attached invoice to pay and avoid suspension of meal service.`,
    attachment: 'Invoice_Oct2026.html',
    verdict: 'scam',
    flags: [
      'The domain is lincolnhs-billing.net — a fake copy of the school domain.',
      'An .html "invoice" is a fake login page in disguise.',
      'Threatening to suspend meals is emotional pressure.',
      'School payments go through the official portal, not an attachment.'
    ],
    lesson: 'Attachments ending in .html, .htm or .zip are usually fake login pages. Real invoices come as PDFs from the real domain.'
  }
];

const QUIZ = [
  {
    id: 'padlock',
    type: 'choice', time: 20,
    prompt: 'What does the padlock beside a website address tell you?',
    options: [
      { text: 'The website is definitely honest', why: 'Scam websites can show a padlock too.' },
      { text: 'Your connection is protected, but the site could still be fake', correct: true, why: 'The padlock protects the connection. You still need to check that the website address is real.' },
      { text: 'A teacher has checked the website', why: 'A padlock does not mean a teacher or expert checked the site.' },
      { text: 'It is safe to share your password with the site', why: 'Never share a password unless you are sure you are on the real website.' }
    ],
    lesson: 'A padlock protects the connection. Check the website address too, especially before signing in.'
  },
  {
    id: 'strongest',
    type: 'choice', time: 25,
    prompt: 'Which of these passwords is hardest for someone else to guess?',
    sub: 'Tip: a longer password made from several unrelated words is easier to remember and harder to guess.',
    options: [
      { text: 'Summer2024!', mono: true, why: 'A season and a year are common guesses.' },
      { text: 'Tr0ub4dor&3', mono: true, why: 'Changing letters to numbers does not always make a password hard to guess.' },
      { text: 'blue-otter-sunset-hammer', mono: true, correct: true, why: 'It is long and combines several unrelated words.' },
      { text: 'P@ssw0rd123', mono: true, why: 'This is a common password pattern that people often guess.' }
    ],
    lesson: 'Use a long, unique password. A few unrelated words can be easier to remember than a short jumble of symbols.'
  },
  {
    id: 'breach',
    type: 'choice', time: 25,
    prompt: 'A website says your password may have been stolen. What should you do?',
    options: [
      { text: 'Tell a trusted adult, then change it on the real site and anywhere else you reused it', correct: true, why: 'Open the real app or website yourself instead of following a message link. Ask an adult to help.' },
      { text: 'Keep using it unless you notice a problem', why: 'Someone else may already know the password.' },
      { text: 'Reply to the email with your password to check', why: 'Never send your password in a message.' },
      { text: 'Use the same password but add an exclamation mark', why: 'A small change may still be easy to guess. Make a new, different password.' }
    ],
    lesson: 'Use a different password for each account. If you get a warning, ask a trusted adult and open the real app or website yourself.'
  },
  {
    id: 'twofa',
    type: 'choice', time: 20,
    prompt: 'Why is it helpful to use a second sign-in check, like an app code?',
    options: [
      { text: 'It gives your account an extra layer of protection', correct: true, why: 'A stolen password alone may not be enough to sign in.' },
      { text: 'It means you never need a password', why: 'Most accounts still ask for a password as well.' },
      { text: 'It makes your internet faster', why: 'Extra sign-in checks protect accounts; they do not change internet speed.' },
      { text: 'It shares your password with your phone', why: 'A sign-in code is a separate check. Never share it with another person.' }
    ],
    lesson: 'Turn on the extra sign-in check when you can. Never tell anyone your sign-in code.'
  },
  {
    id: 'reuse',
    type: 'choice', time: 20,
    prompt: 'Why should you use different passwords for different accounts?',
    options: [
      { text: 'If one password is stolen, it could unlock your other accounts too', correct: true, why: 'Different passwords help keep your other accounts safe if one account is exposed.' },
      { text: 'Websites will work faster', why: 'Your password does not affect how fast a website loads.' },
      { text: 'You have to change every password each day', why: 'You do not need to change them every day. Just avoid reusing them.' },
      { text: 'It is a rule that only adults need to follow', why: 'Everyone should protect their accounts, including students.' }
    ],
    lesson: 'Give every account its own password, like using a different key for each lock.'
  },
  {
    id: 'usb',
    type: 'choice', time: 20,
    prompt: 'You find a USB stick at school. What is the safest thing to do?',
    options: [
      { text: 'Give it to a teacher or school IT staff without plugging it in', correct: true, why: 'They can handle it safely and try to find its owner.' },
      { text: 'Plug it into a school computer to see what is on it', why: 'An unknown USB stick could harm the computer.' },
      { text: 'Take it home and try it on your own computer', why: 'It could put your own computer and files at risk too.' },
      { text: 'Use it for your homework files', why: 'You do not know what is on the USB stick.' }
    ],
    lesson: 'Do not plug in a USB stick you find. Give it to a trusted adult.'
  },
  {
    id: 'otp',
    type: 'choice', time: 20,
    prompt: 'A caller says they are from your bank and asks for a sign-in code. What should you do?',
    options: [
      { text: 'Do not share the code. Hang up and tell a trusted adult', correct: true, why: 'A real helper should not ask you to read out a sign-in code.' },
      { text: 'Read it out because the caller sounds official', why: 'A caller can pretend to be someone they are not.' },
      { text: 'Text them the code instead', why: 'A code is private, even if someone asks by text.' },
      { text: 'Give them the code if they know your name', why: 'Knowing your name does not prove that the caller is trustworthy.' }
    ],
    lesson: 'Never share a sign-in code. Ask a trusted adult to help you contact the bank using its official number.'
  },
  {
    id: 'overshare',
    type: 'choice', time: 20,
    prompt: 'Which post shares too much private information?',
    options: [
      { text: 'A picture of a game you like', why: 'This usually does not reveal where you live or when you are away.' },
      { text: 'Your home address and the time you walk to school', correct: true, why: 'This tells strangers where you live and when you may be away.' },
      { text: 'A drawing you made', why: 'This is generally fine if it does not show private details.' },
      { text: 'A picture of your lunch', why: 'This usually does not share your address or daily routine.' }
    ],
    lesson: 'Keep your address, school and daily routine private online.'
  },
  {
    id: 'ransom',
    type: 'choice', time: 20,
    prompt: 'A harmful program called ransomware affects your files. What might happen?',
    options: [
      { text: 'Locks them and demands money to unlock them', correct: true, why: 'Ransomware can stop you opening your files and ask you to pay.' },
      { text: 'Makes your screen brighter', why: 'Ransomware is a threat to your files, not your screen settings.' },
      { text: 'Gives your computer more storage', why: 'It can lock files; it does not add storage.' },
      { text: 'Changes the colour of your keyboard', why: 'Ransomware can stop you opening files.' }
    ],
    lesson: 'Keep a backup of important work and ask a trusted adult for help if a device behaves strangely.'
  },
  {
    id: 'backup',
    type: 'choice', time: 20,
    prompt: 'How can you help keep your schoolwork safe if a computer breaks?',
    options: [
      { text: 'Keep a backup copy in a place your teacher or family recommends', correct: true, why: 'A backup gives you another copy if the original is lost or damaged.' },
      { text: 'Remember a longer password', why: 'A password protects an account, but it does not make a backup of your work.' },
      { text: 'Keep only one copy on the computer', why: 'If the computer breaks, that one copy could be lost.' },
      { text: 'Avoid saving your work', why: 'Saving your work and keeping a backup is safer.' }
    ],
    lesson: 'Save a backup copy of important work somewhere trusted.'
  },
  {
    id: 'updates',
    type: 'choice', time: 20,
    prompt: 'Why should you install updates for your phone or computer?',
    options: [
      { text: 'They can fix problems and help protect your device', correct: true, why: 'Updates often repair security problems and keep apps working well.' },
      { text: 'They make your device impossible to hack', why: 'Updates help, but no device is perfectly safe.' },
      { text: 'They are only needed by adults', why: 'Students use devices too, so updates matter for everyone.' },
      { text: 'They give you more free internet', why: 'Updates do not add free internet.' }
    ],
    lesson: 'Install updates when they are available, or ask a trusted adult for help.'
  },
  {
    id: 'clicked',
    type: 'choice', time: 25,
    prompt: 'You entered your school password on a page that now seems fake. What should you do?',
    options: [
      { text: 'Tell a teacher or trusted adult right away and change your password with them', correct: true, why: 'Quick help can protect your account. It is always okay to tell someone, even if you made a mistake.' },
      { text: 'Keep it secret and hope nothing happens', why: 'A trusted adult can help protect your account sooner.' },
      { text: 'Close the page and do nothing else', why: 'Someone may already have the password you entered.' },
      { text: 'Send the same password to the page again', why: 'Do not enter your password on a page you do not trust.' }
    ],
    lesson: 'Tell a trusted adult quickly. You will not be in trouble for asking for help.'
  },
  {
    id: 'socialeng',
    type: 'choice', time: 20,
    prompt: 'What is a social engineering trick?',
    options: [
      { text: 'Tricking someone into sharing private information', correct: true, why: 'A trickster may pretend to be someone you trust or make a request seem urgent.' },
      { text: 'Building a new computer game', why: 'That is not a trick to steal information.' },
      { text: 'Fixing a broken school computer', why: 'That is a normal way to help.' },
      { text: 'Making your password longer', why: 'That can help protect an account, but it is not social engineering.' }
    ],
    lesson: 'If a message makes you feel rushed, stop and check with a trusted adult.'
  },
  {
    id: 'wifi',
    type: 'choice', time: 20,
    prompt: 'You are using public Wi-Fi. Which choice is safest?',
    options: [
      { text: 'Avoid signing into important accounts; ask an adult if you need to', correct: true, why: 'Public Wi-Fi may not be private. Avoiding sensitive logins is a safer choice.' },
      { text: 'Sign into your bank quickly', why: 'It is better not to use important accounts on a public network.' },
      { text: 'Turn off your device security to make it faster', why: 'Device security helps protect you, so leave it on.' },
      { text: 'Trust it because it asked for a password', why: 'A Wi-Fi password does not prove who runs the network.' }
    ],
    lesson: 'Ask a trusted adult before using public Wi-Fi for important accounts.'
  },
  {
    id: 'manager',
    type: 'choice', time: 20,
    prompt: 'What can a trusted password manager help you do?',
    options: [
      { text: 'Create and remember a different password for each account', correct: true, why: 'A password manager stores passwords so you do not have to reuse one everywhere.' },
      { text: 'Share your passwords with your friends', why: 'Your passwords should stay private.' },
      { text: 'Make every account use the same password', why: 'Different passwords help keep your other accounts safe.' },
      { text: 'Make it okay to share your login code', why: 'Never share a login code, even when you use a password manager.' }
    ],
    lesson: 'Ask a trusted adult before choosing a password manager. Use a different password for each account.'
  },
  {
    id: 'mfafatigue',
    type: 'choice', time: 25,
    prompt: 'Your phone asks you to approve a sign-in you did not start. What should you do?',
    options: [
      { text: 'Choose Deny and tell a trusted adult', correct: true, why: 'Someone may be trying to sign in. Do not approve a request you did not make.' },
      { text: 'Keep tapping Approve until it stops', why: 'You could accidentally let someone into your account.' },
      { text: 'Ignore it and approve the next one', why: 'Only approve sign-ins you started yourself.' },
      { text: 'Send the approval request to a friend', why: 'Do not share sign-in requests or codes with anyone.' }
    ],
    lesson: 'Only approve sign-ins you started. If you see a surprise request, choose Deny and tell a trusted adult.'
  }
];

const CHATS = [
  {
    id: 'principal',
    type: 'chat', time: 40,
    contact: { name: 'Principal Hayes', sub: 'Unknown number · 1 new message', icon: 'PH' },
    thread: [{ who: 'them', text: 'Hi, I am the principal. I need the sign-in code that was just sent to your phone. Please send it quickly and do not tell anyone.' }],
    options: [
      { text: 'Send the code because they say they are the principal', why: 'A real staff member should not ask you to share a sign-in code.', reply: '⚠️ Someone uses the code to try to enter your account.' },
      { text: 'Do not share it. Check with a teacher or visit the school office', correct: true, why: 'You checked with someone in person instead of trusting an unexpected message.', reply: '✅ The real principal did not send the message. You kept your account safe.' },
      { text: 'Send your password instead', why: 'Your password is private too. Never send it in a message.', reply: '⚠️ Someone now has information they could use to access your account.' },
      { text: 'Ask the sender to prove who they are by sending another message', why: 'The same person could send another message. Check with a trusted adult in person.', reply: '⚠️ The sender sends another message and asks again.' }
    ],
    lesson: 'Never share a sign-in code. Check surprising requests with a trusted adult in person.'
  },
  {
    id: 'remote',
    type: 'chat', time: 40,
    contact: { name: 'IT Support', sub: 'Unknown caller · screenshot attached', icon: 'IT' },
    thread: [{ who: 'them', text: 'Hi, I am from school IT. Please install this app and send me the code on your screen so I can fix your laptop.' }],
    options: [
      { text: 'Install it and send the code', why: 'An unknown app and its code could give someone access to your device.', reply: '⚠️ The caller can now see or control things on your laptop.' },
      { text: 'Do not install it. Check with a teacher or the school IT desk', correct: true, why: 'You asked school staff you can trust before installing anything.', reply: '✅ The school IT desk says it did not send that request.' },
      { text: 'Send a picture of your screen instead', why: 'A picture could still show private information.', reply: '⚠️ The picture reveals information on your laptop.' },
      { text: 'Install the app later when you have more time', why: 'It is still an unknown app, even if you wait.', reply: '⚠️ The app could still give the caller access to your laptop.' }
    ],
    lesson: 'Do not install an app or share a device code because an unexpected caller asks you to. Check with school staff.'
  },
  {
    id: 'luna',
    type: 'chat', time: 40,
    contact: { name: '"Luna"', sub: 'Met in a game chat 3 days ago', icon: 'LU' },
    thread: [{ who: 'them', text: 'We are best friends, so keep our chat secret. What school do you go to, and when do you walk home? I want to surprise you.' }],
    options: [
      { text: 'Tell them your school and when you walk home', why: 'Keep your school and daily routine private, especially from someone you only know online.', reply: '⚠️ The person now knows where you go and when.' },
      { text: 'Do not share those details. Tell a trusted adult about the message', correct: true, why: 'You kept private information safe and asked someone you trust for help.', reply: '✅ A trusted adult helps you block and report the account.' },
      { text: 'Send a photo so they know you are real', why: 'A photo can reveal more about you than you intended.', reply: '⚠️ The person keeps the photo and asks for more information.' },
      { text: 'Keep it secret because they asked you to', why: 'A safe friend should not pressure you to keep secrets from trusted adults.', reply: '⚠️ The person continues asking for private details.' }
    ],
    lesson: 'Keep your school and routine private. Tell a trusted adult if someone online asks for them or asks you to keep secrets.'
  },
  {
    id: 'bankcall',
    type: 'chat', time: 40,
    contact: { name: 'Valley National Fraud', sub: 'Incoming call · number looks real', icon: '🏦' },
    thread: [{ who: 'them', text: 'Hello, I am from your bank. There may be a problem with your account. Please read me the code we just texted you.' }],
    options: [
      { text: 'Read the code because they say they are from the bank', why: 'A real bank should not ask you to share a sign-in code.', reply: '⚠️ Someone may use the code to access your account.' },
      { text: 'Do not share it. Tell a trusted adult and call the bank using its official number', correct: true, why: 'You did not trust an unexpected caller and checked using a number you know is real.', reply: '✅ The real bank can check whether there is a problem.' },
      { text: 'Give them your card details instead', why: 'Keep your card details private too.', reply: '⚠️ Someone now has private information about your card.' },
      { text: 'Ask them to send a link and enter your details there', why: 'The link could lead to a fake website.', reply: '⚠️ The page asks for private card information.' }
    ],
    lesson: 'Never share a sign-in code or card details with an unexpected caller. Ask a trusted adult to help.'
  },
  {
    id: 'friendlogin',
    type: 'chat', time: 35,
    contact: { name: 'Marcus', sub: 'Classmate · online now', icon: 'MA' },
    thread: [{ who: 'them', text: 'Can I use your homework-site login? Mine is locked and my assignment is due tonight. I promise I will be careful.' }],
    options: [
      { text: 'Share your password because they are your friend', why: 'Keep your password private, even with friends.', reply: '⚠️ Someone else can now use your account.' },
      { text: 'Do not share it. Help them ask a teacher to reset their own account', correct: true, why: 'You protected your account and helped your friend find a safe solution.', reply: '✅ A teacher helps your friend get back into their own account.' },
      { text: 'Share it now and change it tomorrow', why: 'Your account could be used before you change the password.', reply: '⚠️ Someone else signs in to your account.' },
      { text: 'Give them a password you use on another site', why: 'That could put more than one of your accounts at risk.', reply: '⚠️ Someone may try the password on your other accounts too.' }
    ],
    lesson: 'Keep your password private, even with friends. Help them ask a teacher or trusted adult for account help.'
  }
];

/* ---------- password forge mission ---------- */
const PASSWORD_MISSION = [
  {
    id: 'pw-pick',
    type: 'choice', time: 25,
    prompt: 'Which password would be hardest for someone else to guess?',
    sub: 'A long password made from unrelated words is easier to remember.',
    options: [
      { text: 'Gryffindor99', mono: true, why: 'A famous name and a number can be easy to guess.' },
      { text: 'H0tD0g$2026', mono: true, why: 'Changing letters to numbers and adding a year may still be easy to guess.' },
      { text: 'velvet-anchor-mango-tiger', mono: true, correct: true, why: 'It is long and uses several unrelated words.' },
      { text: 'qwertyuiop1', mono: true, why: 'This follows a familiar keyboard pattern.' }
    ],
    lesson: 'Make passwords long, hard to guess and different for each account.'
  },
  {
    id: 'pw-build',
    type: 'pwbuild', time: 120,
    prompt: 'Build a strong practice password',
    sub: 'Use an invented password, not one you use for an account. This is a simple practice estimate, not a guarantee.',
    hint: 'Try a long phrase made from unrelated words, such as "quiet-otter-sunset-hammer". Do not use this example as a real password.',
    threshold: 70
  },
  {
    id: 'pw-manager',
    type: 'choice', time: 20,
    prompt: 'You have several accounts and want a different password for each. What can help?',
    options: [
      { text: 'Use the same password for every account', why: 'If someone learns it once, they could try it on your other accounts.' },
      { text: 'Ask a trusted adult about using a password manager', correct: true, why: 'A password manager can help create and remember different passwords.' },
      { text: 'Use your name and birthday for every account', why: 'People who know you may be able to guess those details.' },
      { text: 'Share all the passwords with your friends', why: 'Passwords should stay private.' }
    ],
    lesson: 'Ask a trusted adult before choosing a password manager, and keep your passwords private.'
  },
  {
    id: 'pw-friend',
    type: 'choice', time: 20,
    prompt: 'A friend asks to borrow your school login. What should you say?',
    options: [
      { text: 'Share it because they are your friend', why: 'Keep your password private, even with friends.' },
      { text: 'Say no and help them ask a teacher for account help', correct: true, why: 'You keep your login private and help your friend safely.' },
      { text: 'Share it but change it tomorrow', why: 'Someone could use your account before then.' },
      { text: 'Give them a password you use on another site', why: 'That could put your other account at risk too.' }
    ],
    lesson: 'Never share your login. Help your friend ask a teacher or trusted adult for help.'
  },
  {
    id: 'pw-2fa',
    type: 'choice', time: 20,
    prompt: 'Someone asks you to read them a sign-in code sent to your phone. What should you do?',
    options: [
      { text: 'Read it to them if they say they are helping', why: 'A sign-in code is private, even if someone says they are helping.' },
      { text: 'Keep it private and tell a trusted adult', correct: true, why: 'Someone could use the code to sign in to your account.' },
      { text: 'Post it in your class chat', why: 'A code should not be shared with anyone.' },
      { text: 'Write it on a note beside your device', why: 'Someone else could see and use the code.' }
    ],
    lesson: 'Sign-in codes are private. Never read or send them to anyone.'
  }
];

/* ---------- field manual ---------- */
const RULES = [
  { n: '01', title: 'Pause when rushed', text: 'Scammers may use threats or deadlines to hurry you. Take a moment and check with a trusted adult.' },
  { n: '02', title: 'Check the website address', text: 'A fake site can copy a real logo. Check the address before you sign in or share information.' },
  { n: '03', title: 'Keep codes and passwords private', text: 'Do not share a sign-in code or password with anyone, even if they say they are from school.' },
  { n: '04', title: 'Use long, different passwords', text: 'Long passwords made from unrelated words can be easier to remember. Use a different one for each account.' },
  { n: '05', title: 'Add a sign-in check', text: 'When available, turn on an extra sign-in step. Never share the code it sends you.' },
  { n: '06', title: 'Save a backup and update', text: 'Keep another copy of important work, and install device updates with help from a trusted adult.' }
];

/* ---------- boss battle ---------- */
const BOSS_INTRO = {
  name: 'NULLBYTE',
  tag: 'A rogue AI is inside the school network. It will try every trick it has — phishing, pressure and plain lies. Answer fast, answer carefully. Eight good calls and it is offline for good.'
};

window.CYBER_DATA = { PHISH, QUIZ, CHATS, PASSWORD_MISSION, RULES, BOSS_INTRO };
})();
