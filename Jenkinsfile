#!groovy

pipeline {
  agent {
    node {
      label 'builder2a'
    }
  }
  stages {
    stage('Install deps') {
      steps {
          ansiColor('xterm') {
            sh '''
                source /opt/rh/devtoolset-2/enable
                npm install
            '''
          }
      }
    }
    stage('Build project') {
      steps {
          ansiColor('xterm') {
            sh '''
              PROJECT_DIR="$(pwd)"

              rm -rf "$PROJECT_DIR/dist"
              mkdir -p "$PROJECT_DIR/dist"

              rm -rf "$PROJECT_DIR/assets"
              npm run build:prod

              cp -r -v "$PROJECT_DIR/assets" "$PROJECT_DIR/dist/"
              cp -r -v "$PROJECT_DIR/index.html" "$PROJECT_DIR/dist/"
              cp -r -v "$PROJECT_DIR/widget-ver.json" "$PROJECT_DIR/dist/"

              npx zopfli "$PROJECT_DIR"/dist/index.html
              npx zopfli "$PROJECT_DIR"/dist/assets/i/*
            '''
          }
      }
    }
    stage('Make rpm') {
      when {
        branch 'master'
      }
      steps {
          ansiColor('xterm') {
            sh '''
              PROJECT_DIR="$(pwd)"
              rm -rf "$PROJECT_DIR/build"
              mkdir -p "$PROJECT_DIR/build"

              ARTIFACT_NAME="widgets-gpb-leader-landing"
              RPMVER="1.1.${BUILD_NUMBER:-0}"
              RPMREL="1"
              ARTIFACT_VERSION="${RPMVER}-${RPMREL}"
              ARTIFACT_FILE_NAME="${ARTIFACT_NAME}-${ARTIFACT_VERSION}"

              INSTALL_TO_DIR=/opt/nginx/www/widgets/ny2018

              fpm --verbose -s dir -t rpm -a all --name "${ARTIFACT_NAME}" --version "${RPMVER}" --iteration "${RPMREL}" \
                    --prefix "${INSTALL_TO_DIR}" -C "build/" \
                    --vendor "RooX Solutions" --license "Proprietary Software" --url "http://rooxteam.com" --description "gpn-leader-landing" \
                    --package "${PROJECT_DIR}/build/" \
                    --rpm-user nginx --rpm-group nginx --directories "${INSTALL_TO_DIR}" \
                    "."
            '''
          }
      }
    }
    stage('Publish rpm') {
      when {
         branch 'master'
      }
      steps {
          ansiColor('xterm') {
            sh '''
              ARTIFACT_NAME="widgets-gpb-leader-landing"
              RPMVER="1.1.${BUILD_NUMBER:-0}"
              RPMREL="1"
              ARTIFACT_VERSION="${RPMVER}-${RPMREL}"
              ARTIFACT_FILE_NAME="${ARTIFACT_NAME}-${ARTIFACT_VERSION}"

              mvn deploy:deploy-file -B -DgroupId=com.rooxteam.widgets \
                  -DartifactId="${ARTIFACT_NAME}" \
                  -Dversion=${ARTIFACT_VERSION} -Dclassifier=rpm \
                  -Dfile=build/"${ARTIFACT_FILE_NAME}".noarch.rpm \
                  -Dpackaging=rpm -DrepositoryId="roox-releases" \
                  -Durl=http://nexus.rooxintra.net/content/repositories/releases/ \
                  -Drelease=true -DgeneratePom=false -DupdateReleaseInfo=true
            '''
          }
      }
    }
    stage('Deploy') {
        when {
           branch 'master'
        }
        steps {
          milestone(1)
          sh '''
            ARTIFACT_NAME="widgets-gpb-leader-landing"
            RPMVER="1.1.${BUILD_NUMBER:-0}"
            RPMREL="1"
            ARTIFACT_VERSION="${RPMVER}-${RPMREL}"
            ARTIFACT_FILE_NAME="${ARTIFACT_NAME}-${ARTIFACT_VERSION}"
            RPM_URL="http://nexus.rooxintra.net/content/repositories/releases/com/rooxteam/widgets/${ARTIFACT_NAME}/${ARTIFACT_VERSION}/${ARTIFACT_FILE_NAME}-rpm.rpm"

            ssh -o StrictHostKeyChecking=no -i /home/jenkins/vagrant-aws/slack-backup.pem centos@gpb-leader.demo.rooxteam.com sudo yum install -y --disablerepo=* $RPM_URL
          '''
        }
     }
  }
  post {

      aborted {
        echo "Sending message to Slack"
        script {
          def authors = currentBuild.changeSets.collectMany { it.toList().collect { it.author } }.unique().toString()
          slackSend (color: "#818284",
                             channel: "management",
                             message: "*ABORTED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${authors}\n More info at: ${env.BUILD_URL}")
        }

      } // aborted

      failure {

        echo "Sending message to Slack"
        script {
          def authors = currentBuild.changeSets.collectMany { it.toList().collect { it.author } }.unique().toString()
          slackSend (color: "#d13c06",
                             channel: "management",
                             message: "*FAILED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${authors}\n More info at: ${env.BUILD_URL}")
        }

      } // failure

      success {
        script {

          if (env.BRANCH_NAME == 'develop') {
              echo 'I only executed on the develop branch'
              echo "Sending message to Slack"
              def commits = currentBuild.changeSets.collectMany { it.toList().collect {  it.msg + " - _" + it.author + "_" } }.unique().join('\n')

              def authors = currentBuild.changeSets.collectMany { it.toList().collect { it.author } }.unique().join(',')

              slackSend (color: "#397f3e",
                   channel: "gpb-leader-management",
                   message: ":zap: *Frontend обновлен на стенде* :zap: \n\n:pr: ${commits}\n\n:package: widgets-znt-spa-1.1.${env.BUILD_ID} :github: <https://github.com/rooxteam/widgets-znt/commits/develop|Github> | :jenkins: <${env.BUILD_URL}|Jenkins> | :znt: <https://sso-znt.demo.rooxteam.com/|ZNT-DBO>")


          } else {
              echo 'I not executed elsewhere'
          }
        }
      } // success

    } // post
}
