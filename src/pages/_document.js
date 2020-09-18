import Document, {
  Html, Head, NextScript, Main,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          {/* Here we will mount our modal portal */}
          <div id="modal" className="absolute inset-0 z-50" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
