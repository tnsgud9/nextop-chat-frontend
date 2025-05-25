import type {
  UserSearchRequestDto,
  UserSearchResponseDto,
} from "@/commons/dtos/user.dto";
import type { UserInfoDto } from "@/commons/dtos/userinfo.dto";
import config from "@/config";
import axios from "axios";

export const searchUserInfos = async (
  nickname: string,
): Promise<UserInfoDto[]> => {
  try {
    const response = await axios.get(`${config.SERVER_URI}/user/search`, {
      params: { nickname } as UserSearchRequestDto,
      withCredentials: true,
    });
    return (response.data as UserSearchResponseDto).userInfos;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};
