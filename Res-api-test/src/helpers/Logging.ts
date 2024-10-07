// Logging.ts
import { blue, blueBright, yellow, yellowBright, red, redBright, green, greenBright } from 'colorette';

export default class Logging {
  public static log = (args: any) => this.info(args);

  public static info = (args: any) =>
    console.log(blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? blueBright(args) : args);

  public static success = (args: any) =>
    console.log(green(`[${new Date().toLocaleString()}] [SUCCESS]`), typeof args === 'string' ? greenBright(args) : args);

  public static warning = (args: any) =>
    console.log(
      yellow(`[${new Date().toLocaleString()}] [WARN]`),
      typeof args === 'string' ? yellowBright(args) : args,
    );

  public static error = (args: any) =>
    console.log(red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? redBright(args) : args);
}