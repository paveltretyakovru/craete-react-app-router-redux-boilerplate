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

              rm -rf "$PROJECT_DIR/package"
              mkdir -p "$PROJECT_DIR/package"

              npm run build
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
              rm -rf "$PROJECT_DIR/package"
              mkdir -p "$PROJECT_DIR/package"

              ARTIFACT_NAME="widgets-gpn-leader-landing"
              RPMVER="1.1.${BUILD_NUMBER:-0}"
              RPMREL="1"
              ARTIFACT_VERSION="${RPMVER}-${RPMREL}"
              ARTIFACT_FILE_NAME="${ARTIFACT_NAME}-${ARTIFACT_VERSION}"

              INSTALL_TO_DIR=/opt/nginx/www/widgets/ny2018

              fpm --verbose -s dir -t rpm -a all --name "${ARTIFACT_NAME}" --version "${RPMVER}" --iteration "${RPMREL}" \
                    --prefix "${INSTALL_TO_DIR}" -C "build/" \
                    --vendor "RooX Solutions" --license "Proprietary Software" --url "http://rooxteam.com" --description "gpn-leader-landing" \
                    --package "${PROJECT_DIR}/package/" \
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
              ARTIFACT_NAME="widgets-gpn-leader-landing"
              RPMVER="1.1.${BUILD_NUMBER:-0}"
              RPMREL="1"
              ARTIFACT_VERSION="${RPMVER}-${RPMREL}"
              ARTIFACT_FILE_NAME="${ARTIFACT_NAME}-${ARTIFACT_VERSION}"

              mvn deploy:deploy-file -B -DgroupId=com.rooxteam.widgets \
                  -DartifactId="${ARTIFACT_NAME}" \
                  -Dversion=${ARTIFACT_VERSION} -Dclassifier=rpm \
                  -Dfile=package/"${ARTIFACT_FILE_NAME}".noarch.rpm \
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
            ARTIFACT_NAME="widgets-gpn-leader-landing"
            RPMVER="1.1.${BUILD_NUMBER:-0}"
            RPMREL="1"
            ARTIFACT_VERSION="${RPMVER}-${RPMREL}"
            ARTIFACT_FILE_NAME="${ARTIFACT_NAME}-${ARTIFACT_VERSION}"
            RPM_URL="http://nexus.rooxintra.net/content/repositories/releases/com/rooxteam/widgets/${ARTIFACT_NAME}/${ARTIFACT_VERSION}/${ARTIFACT_FILE_NAME}-rpm.rpm"

            ssh -o StrictHostKeyChecking=no -i /home/jenkins/vagrant-aws/slack-backup.pem centos@gpn-leader.demo.rooxteam.com sudo yum install -y --disablerepo=roox* $RPM_URL
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
                             channel: "gpn-leader-general",
                             message: "*ABORTED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${authors}\n More info at: ${env.BUILD_URL}")
        }

      } // aborted

      failure {

        echo "Sending message to Slack"
        script {
          def authors = currentBuild.changeSets.collectMany { it.toList().collect { it.author } }.unique().toString()
          slackSend (color: "#d13c06",
                             channel: "gpn-leader-general",
                             message: "*FAILED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${authors}\n More info at: ${env.BUILD_URL}")
        }

      } // failure

      success {
        script {

          if (env.BRANCH_NAME == 'master') {
              echo 'I only executed on the develop branch'
              echo "Sending message to Slack"
              def commits = currentBuild.changeSets.collectMany { it.toList().collect {  it.msg + " - _" + it.author + "_" } }.unique().join('\n')

              def authors = currentBuild.changeSets.collectMany { it.toList().collect { it.author } }.unique().join(',')

              slackSend (color: "#397f3e",
                   channel: "gpn-leader-general",
                   message: ":zap: *Frontend обновлен на стенде* :zap: \n\n:pr: ${commits}\n\n:package: widgets-gpn-leader-landing-1.1.${env.BUILD_ID} :github: <https://bitbucket.org/rooxteam/gpn-leader-landing/commits/develop|Bitbucket> | :jenkins: <${env.BUILD_URL}|Jenkins> | :znt: <https://gpn-leader.demo.rooxteam.com/|GPN Leader>")


          } else {
              echo 'I not executed elsewhere'
          }
        }
      } // success

    } // post
}
