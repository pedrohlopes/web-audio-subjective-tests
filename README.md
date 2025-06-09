# Web Audio Subjective Tests

This project is a web application for conducting subjective audio tests, allowing users to evaluate different audio files (formatted in .wav, .mp3, .ogg, or .aac) through an intuitive interface. The goal is to facilitate auditory perception experiments, such as audio quality tests, reference, anchor, and other subjective evaluation scenarios.

## Features
- Presentation of different audio files for evaluation.
- Support for local audio files and descriptive texts.
- Evaluation interface with customizable scales.
- Support for references and anchors, with conditional display logic.
- Results can be exported for later analysis.

## Supported Evaluation Scales

As of now, the application supports the following types of evaluation scales, configurable via the `public/subjective_test_config.json` file:

1. **Discrete Numeric Scale**
    - Users rate audio files on a fixed set of integer values (e.g., 1–5, 1–7).
    - Configuration example:
      ```json
      {
         "scale": {
            "type": "discrete",
            "min": 1,
            "max": 5,
            "labels": ["Bad", "Poor", "Fair", "Good", "Excellent"]
         }
      }
      ```
    - `min` and `max` define the range.
    - `labels` are optional and provide descriptive text for each value.

2. **Continuous Slider Scale**
    - Users rate audio files using a slider, allowing for fine-grained selection within a range.
    - Configuration example:
      ```json
      {
         "scale": {
            "type": "continuous",
            "min": 0,
            "max": 100,
            "step": 1,
            "labels": ["Worst", "Best"]
         }
      }
      ```
    - `step` defines the granularity of the slider.
    - `labels` can be used to annotate the endpoints.

3. **Categorical Scale**
    - Users select from a list of predefined categories.
    - Configuration example:
      ```json
      {
         "scale": {
            "type": "categorical",
            "categories": ["Unacceptable", "Poor", "Fair", "Good", "Excellent"]
         }
      }
      ```
    - `categories` is an array of string labels.

### Setting Up Scales

- Edit the `public/subjective_test_config.json` file.
- Under each test or question, define the `scale` object as shown above.
- Only one scale type can be used per question.

## Reference and Anchor Signals

- The application supports the use of reference and anchor audio files.
- Reference: A high-quality or original audio for comparison.
- Anchor: A deliberately degraded audio to serve as a lower bound.
- To use these, add the corresponding files to `public/test_signals/` and reference them in the configuration:
  ```json
  {
     "audio_files": [
        {"type": "reference", "file": "reference.wav"},
        {"type": "anchor", "file": "anchor.wav"},
        {"type": "test", "file": "test.wav"}
     ]
  }
  ```
- Conditional display logic can be set up in the configuration to control when references or anchors are shown.

## Result Export

- At the end of the test, results are automatically exported.
- The export format is typically CSV or JSON, and the file is made available for download.
- The export includes user responses, timestamps, and any additional metadata configured.

## Additional Functionalities

- **Local Audio File Support:** Place audio files in `public/test_signals/` and reference them in the configuration. If you want, you can also use a descriptive text instead of the filename to add different scales (multiple responses) for the same audio file.
- **Customizable Questions:** Add or modify questions in the configuration file to tailor the test to your needs.
- **Auxiliary Components:** The `src/Components/` directory contains reusable UI components for building custom test flows.

For further customization or to add new scale types, refer to the source code in `src/Components/AudioTestBlock.js` and related components.

## Project Structure
- `src/Components/AudioTestBlock.js`: Main component for displaying and evaluating each audio.
- `public/test_signals/`: Folder with example audio files (anchor.wav, reference.wav, test.wav).
- `public/subjective_test_config.json`: Example test configuration.
- Other auxiliary components in `src/Components/`.

## How to run the project

### Prerequisites
- Node.js (recommended v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd web-audio-subjective-tests
    ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```



## How to use
1. Configure the audio files and questions in the `public/subjective_test_config.json` file.
2. Start the application (run `npm start` and Access [http://localhost:3000](http://localhost:3000) in your browser).
3. The configured test will be presented and the subject should follow the instructions on the screen.
4. Results are automatically exported at the end of the test as a csv file (downloaded on your browser).

## Customization
- Add new audio files to `public/test_signals/`.
- Edit scales and questions in `public/subjective_test_config.json`.
