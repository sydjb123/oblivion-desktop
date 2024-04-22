import { ipcRenderer } from './utils';

type keys = 'theme';

export class settings {
    public static async get(key: keys): Promise<any> {
        ipcRenderer.sendMessage('settings', {
            mode: 'get',
            key: key,
        });

        return new Promise((resolve, reject) => {
            ipcRenderer.on('settings', (res: any) => {
                try {
                    if (res.key === key) {
                        resolve(res.value);
                    } else {
                        console.error('unmatched key event!', res.key, key);
                    }
                } catch (error) {
                    console.error('settings - ipcRenderer.on - error:', error);
                    reject(error);
                }
            });
        });
    }

    public static async set(key: keys, value: any) {
        ipcRenderer.sendMessage('settings', {
            mode: 'set',
            key: key,
            value: value,
        });

        return new Promise((resolve, reject) => {
            ipcRenderer.on('settings', (res: any) => {
                try {
                    if (res.key === key) {
                        resolve(res.value);
                    } else {
                        console.error('unmatched key event!', res.key, key);
                    }
                } catch (error) {
                    console.error('settings - ipcRenderer.on - error:', error);
                    reject(error);
                }
            });
        });
    }
}
