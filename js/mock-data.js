/**
 * Mock user, letters, threads — matches prototype content
 */

export const mockUser = {
  nickname: 'Misty Shore',
  avatarColor: '#0f3460',
  avatarIntensity: 0.8,
  avatarImage: null, // filename из assets/lighthouses/, например '3.jpg'
};

export const mockLetters = [
  {
    id: 'letter-1',
    from: 'Northern Flame',
    fromAvatar: '4.png',
    fromLocation: 'Italy',
    date: 'today',
    dateRaw: new Date().toISOString(),
    preview: '"I don\'t know who you are. But today I felt like writing to someone who doesn\'t know me at all..."',
    body: `I don't know who you are. But today I felt like writing to someone who doesn't know me at all — no history, no expectations.

I live by the sea. Every morning I step out onto the balcony and listen to it breathe. Sometimes I feel like it knows something I don't. Something important.

Do you ever just listen to something, with no particular reason?`,
    translatedFrom: 'Italian',
    hasSketch: true,
    sketchPlaceholder: 'a pencil sketch of a wave',
  },
  {
    id: 'letter-2',
    from: 'Lunar Tide',
    fromAvatar: '7.png',
    fromLocation: '',
    date: 'yesterday',
    dateRaw: new Date(Date.now() - 864e5).toISOString(),
    preview: '"Autumn feels particularly long this year. I watch the trees and wonder how they are not afraid..."',
    body: `Autumn feels particularly long this year. I watch the trees and wonder how they are not afraid of losing everything, every time.`,
    translatedFrom: null,
    hasSketch: false,
    sketchPlaceholder: null,
  },
  {
    id: 'letter-3',
    from: 'Blue Cove',
    fromAvatar: '12.png',
    fromLocation: '',
    date: '3 days ago',
    dateRaw: new Date(Date.now() - 3 * 864e5).toISOString(),
    preview: '"I painted for the first time in three years today. Clumsy and funny, but it felt good."',
    body: `I painted for the first time in three years today. Clumsy and funny, but it felt good.`,
    translatedFrom: null,
    hasSketch: false,
    sketchPlaceholder: null,
  },
];

/** Time capsule sent letters — 3 demos + dynamic. id, preview, delay (sec), writtenAt, deliverAt, status, threadId? */
export const mockSentLetters = [
  {
    id: 'sent-demo-1',
    preview: "I wonder if by the time you read this, things will look different to me too. I'm writing from a place of...",
    delay: 2592000,
    writtenAt: new Date(Date.now() - 2 * 86400000),
    deliverAt: new Date(Date.now() + 30 * 86400000),
    status: 'pending',
  },
  {
    id: 'sent-demo-2',
    preview: "A year from now you'll receive this. I don't know who you are yet, but I already...",
    delay: 31536000,
    writtenAt: new Date(Date.now() - 5 * 86400000),
    deliverAt: new Date(Date.now() + 365 * 86400000),
    status: 'pending',
  },
  {
    id: 'sent-demo-3',
    preview: "You won't know when I wrote this. That's the point. Some things need time to travel.",
    delay: 86400,
    writtenAt: new Date(Date.now() - 2 * 86400000),
    deliverAt: new Date(Date.now() - 86400000),
    status: 'conversation',
    threadId: 'thread-1',
  },
];

export const mockThreads = [
  {
    id: 'thread-1',
    partnerName: 'Northern Flame',
    partnerAvatar: '4.png',
    startedFromLetterId: 'letter-1',
    startedAt: 'Feb 28',
    status: 'drifting with you',
    messages: [
      {
        id: 'm1',
        from: 'them',
        body: 'You actually replied. I honestly didn\'t expect that.',
        time: '14:23',
        translated: true,
      },
      {
        id: 'm2',
        from: 'me',
        body: "Your letter about the sea — I read it twice. There's no sea near my city, only rivers. But I understood what you meant.",
        time: '14:27',
        translated: false,
      },
      {
        id: 'm3',
        from: 'them',
        body: 'Rivers breathe too. In their own way.',
        time: '14:31',
        translated: true,
      },
      {
        id: 'm4',
        from: 'me',
        body: "Yes. You're right. I hadn't thought of it like that.",
        time: '14:33',
        translated: false,
      },
    ],
  },
];
