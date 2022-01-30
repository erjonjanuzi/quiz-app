abstract class Logger {
    abstract info(str: string): void;
    abstract debug(str: string): void;
    abstract warn(str: string): void;
    abstract error(str: string | Error): void;
}

class ProductionLogger extends Logger {
    info(str: string): void { }
    debug(str: string): void { }
    warn(str: string): void {
        console.warn(str);
    }
    error(str: string | Error): void {
        console.error(str);
    }
}

class DevelopmentLogger extends Logger {
    info(str: string): void {
        console.info(str);
    }
    debug(str: string): void { 
        console.debug(str);
    }
    warn(str: string): void {
        console.warn(str);
    }
    error(str: string | Error): void {
        console.error(str);
    }
}

class LoggerFactory {
    public static getLogger(): Logger {
        if (process.env.NODE_ENV === 'production'){
            return new ProductionLogger();
        } else {
            return new DevelopmentLogger();
        }
    }
}

export const logger = LoggerFactory.getLogger();