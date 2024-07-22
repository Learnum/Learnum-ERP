export class MeetingDetails {
    meetingId: number;
    collegeId: number;
    meetingwith: string;
    meetingDate: string;
    meetingTime: string;
    meetingLocation: string;
    meetingAgenda: string;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}