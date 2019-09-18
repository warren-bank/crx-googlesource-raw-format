### [GoogleSource Raw Format](https://github.com/warren-bank/crx-googlesource-raw-format)

Chrome extension for "GoogleSource" website to enable downloading files from repos in raw format

#### UI:

* adds a link at the bottom-right corner of the page
  * appears to the right of the already available format options: "text", "json"
  * new format option: "raw"
* when this link is clicked:
  * the file contents are fetched in base64 format
  * the data is decoded
  * a download dialog appears
  * you can choose where to save the file

#### URL Querystring Detection:

* adds support for the URL querystring parameter: `?format=RAW`
  * automatic download is triggered when detected at page load

#### Examples:

* "aapt" v0.2-4509860
  * [Windows](https://android.googlesource.com/platform/prebuilts/sdk/+/platform-tools-29.0.3/tools/windows/bin/aapt.exe)
  * [Linux](https://android.googlesource.com/platform/prebuilts/sdk/+/platform-tools-29.0.3/tools/linux/bin/aapt)
* "apksigner.jar" v27.0.3
  * [cross-platform](https://chromium.googlesource.com/android_tools/+/c22a664c39af72dd8f89200220713dcad811300a/sdk/build-tools/27.0.3/lib/apksigner.jar)
* arbitrary .xml file
  * [pretty print](https://android.googlesource.com/platform/manifest/+/refs/heads/master/default.xml)
  * [direct download](https://android.googlesource.com/platform/manifest/+/refs/heads/master/default.xml?format=RAW)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
