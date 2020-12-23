export const commands = []
export default (command: string, description: string): any =>
    () => {
        commands.push({ command, description })
    }
