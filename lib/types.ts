/** /api/ticket-event GET 응답 */
export type TicketEventData = {
  headerTitle: string;
  eventTitle: string;
  eventDateLabel: string;
  details: {
    dateDisplay: string;
    timeRange: string;
    location: string;
  };
  ticket: {
    issued: number;
    capacity: number;
    statusLabel: string;
  };
  notices: string[];
};

/** /api/mypage GET 응답 */
export type MyPageData = {
  profile: {
    name: string;
    studentId: string;
    department: string;
    yearLabel: string;
  };
  ticketSummary: { total: number; unused: number };
  tickets: {
    id: string;
    eventName: string;
    date: string;
    status: 'unused' | 'used';
    ticketCode: string;
  }[];
  settings: { id: string; label: string; href: string }[];
};
