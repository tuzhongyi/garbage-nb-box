export class Language {
  static NBBoxStatus(value?: string) {
    switch (value) {
      case '0':
        return '正常'
      case '1':
        return '告警'
      default:
        return '未知'
    }
  }
}
