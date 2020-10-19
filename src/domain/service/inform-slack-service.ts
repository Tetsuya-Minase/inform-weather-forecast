export interface InformSlackService {
  /**
   * slackに通知する
   * @param message slackに通知するメッセージ
   */
  informMessage(message: string): Promise<void>;
}
