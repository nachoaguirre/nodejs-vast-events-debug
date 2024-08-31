# Node.js VAST Debug Server

## Description

This project implements a debug server for VAST (Video Ad Serving Template). It allows developers and testers to test and debug VAST implementations by providing a server that serves VAST XML and logs tracking events.

## Features

- Dynamically generates and serves VAST XML
- Logs VAST tracking events
- Allows configuration of VAST parameters
- Supports serving static files (such as ad videos)
- Flexible configuration through command-line arguments and configuration file

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/nachoaguirre/nodejs-vast-events-debug.git
   cd nodejs-vast-events-debug
   ```

2. No dependencies are required. The project uses native Node.js modules.

## Usage

To start the server with default configuration:

```
npm start
```

### Command-line Arguments

You can customize some configurations using command-line arguments:

- `--host`: Specify the host (default: 'localhost')
- `--port`: Specify the port (default: 8030)
- `--showTimestamp`: Show or hide timestamp in logs (default: true)
- `--urlDest`: Destination URL for ad click

Example:
```
npm start --host=192.168.1.100 --port=8035 --showTimestamp=false
```

## Configuration

The main configuration is in the `config.js` file. Here you can adjust various parameters such as:

- Server HOST and PORT
- Ad destination URL
- Media file configuration (duration, dimensions)
- VAST event and tracking parameters

For more details, refer to the comments in `config.js`.

## Project Structure

- `index.js`: Application entry point
- `config.js`: Server and VAST configuration
- `src/server.js`: Main server implementation
- `src/vast.xml.js`: VAST XML generator
- `src/utils.js`: Utility functions

## Usage Examples

1. Serving VAST XML:
   ```
   http://localhost:8030/vast.xml
   ```

   You can use the demo VAST XML served by the server or use your own. If using your own, make sure to update the tracking URLs with the appropriate base URL.

2. Adding custom parameters to demo VAST XML:
   ```
   http://localhost:8030/vast.xml?param1=value1&param2=value2
   ```

   These custom parameters will be added to all tracking URLs in the VAST XML.

3. Logging a tracking event:
   ```
   http://localhost:8030/start
   ```

4. Logging an event with additional parameters:
   ```
   http://localhost:8030/firstQuartile?custom_param=value
   ```

   When using your own VAST XML, ensure the tracking URLs follow the format: `baseUrl/eventName`. Any additional parameters will appear in the console log.

## VAST XML Usage

1. Demo VAST XML:
   The server provides a demo VAST XML at `/vast.xml`. You can use this for testing purposes.

2. Custom VAST XML:
   If you're using your own VAST XML, ensure that the tracking URLs are updated to point to this debug server. The format should be:
   ```
   http://[SERVER_HOST]:[SERVER_PORT]/[EVENT_NAME]
   ```
   Replace `[SERVER_HOST]` and `[SERVER_PORT]` with your server's actual host and port.

3. Custom Parameters:
   Both the demo and custom VAST XML support adding custom parameters. These will be logged in the console when the corresponding events are triggered.

## Contributing

Contributions are welcome. Feel free to open issues or submit pull requests.
