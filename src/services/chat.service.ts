import type {
  ChatRoomCreateRequestDto,
  ChatRoomCreateResponseDto,
  ChatRoomsResponseDto,
} from "@/commons/dtos/chat.dto";
import type { ChatRoomDto } from "@/commons/dtos/chatroom.dto";
import type { UserInfoDto } from "@/commons/dtos/userinfo.dto";
import config from "@/config";
import axios from "axios";

export const chatrooms = async (): Promise<ChatRoomDto[]> => {
  try {
    const response = await axios.get(`${config.SERVER_URI}/chat/rooms`, {
      withCredentials: true,
    });
    const { chatrooms } = response.data as ChatRoomsResponseDto;
    return chatrooms;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

// 메세지 성공 시 호출될 콜백 타입 정의
export type SuccessCreateChatroomCallback = (
  data: ChatRoomCreateResponseDto,
) => void;
// 실패 시 호출될 콜백 타입 정의
export type FailureCallback = (error: Error) => void;

export const createChatroom = (
  participants: UserInfoDto[],
  onSuccess: SuccessCreateChatroomCallback,
  onFailure: FailureCallback,
): void => {
  axios
    .post(
      `${config.SERVER_URI}/chat/rooms/create`,
      {
        participantIds: participants.map((participant) => participant.id),
      } as ChatRoomCreateRequestDto,
      { withCredentials: true },
    )
    .then((response) => {
      const data = response.data as ChatRoomCreateResponseDto;
      onSuccess(data);
    })
    .catch((err) => {
      // 에러 메시지 추출 및 실패 콜백 실행
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "failed";
      onFailure(new Error(message));
    });
};
